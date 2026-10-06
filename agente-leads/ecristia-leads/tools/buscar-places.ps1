# Busca negocios con Google Places API (New), Text Search.
# Uso: powershell.exe -NoProfile -ExecutionPolicy Bypass -File tools/buscar-places.ps1 -Consulta "clinica odontologica Asuncion" -Cantidad 20
# Requiere la variable de entorno GOOGLE_PLACES_API_KEY. La clave nunca va en este archivo.
# Google devuelve como maximo 60 resultados por consulta (3 paginas de 20).

param(
  [Parameter(Mandatory = $true)][string]$Consulta,
  [ValidateRange(1, 60)][int]$Cantidad = 20
)

$ErrorActionPreference = 'Stop'

$clave = $env:GOOGLE_PLACES_API_KEY
if (-not $clave) {
  Write-Error 'Falta la variable de entorno GOOGLE_PLACES_API_KEY.'
  exit 1
}

# Solo los campos necesarios: el costo de cada consulta depende de los campos pedidos.
$campos = @(
  'places.id',
  'places.displayName',
  'places.formattedAddress',
  'places.businessStatus',
  'places.primaryTypeDisplayName',
  'places.websiteUri',
  'places.nationalPhoneNumber',
  'places.rating',
  'places.userRatingCount',
  'places.googleMapsUri',
  'nextPageToken'
) -join ','

$cabeceras = @{
  'X-Goog-Api-Key'   = $clave
  'X-Goog-FieldMask' = $campos
}

$resultados = @()
$token = $null

do {
  $cuerpo = @{
    textQuery    = $Consulta
    languageCode = 'es'
    regionCode   = 'PY'
    pageSize     = 20
  }
  if ($token) { $cuerpo.pageToken = $token }

  $json = $cuerpo | ConvertTo-Json -Compress
  $bytes = [System.Text.Encoding]::UTF8.GetBytes($json)

  $respuesta = Invoke-RestMethod -Method Post `
    -Uri 'https://places.googleapis.com/v1/places:searchText' `
    -Headers $cabeceras `
    -ContentType 'application/json; charset=utf-8' `
    -Body $bytes

  if ($respuesta.places) { $resultados += $respuesta.places }
  $token = $respuesta.nextPageToken
  if ($token) { Start-Sleep -Seconds 2 }
} while ($token -and $resultados.Count -lt $Cantidad)

$resultados = @($resultados | Select-Object -First $Cantidad)

New-Item -ItemType Directory -Force -Path 'leads' | Out-Null
ConvertTo-Json -InputObject $resultados -Depth 6 | Out-File -Encoding utf8 'leads/places-ultima-busqueda.json'

Write-Output "Consulta: $Consulta"
Write-Output "Resultados guardados: $($resultados.Count) en leads/places-ultima-busqueda.json"
