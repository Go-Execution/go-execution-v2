$ErrorActionPreference = "Stop"

$outputDirectory = Join-Path $PSScriptRoot "..\public\assets\images\stock"
New-Item -ItemType Directory -Force -Path $outputDirectory | Out-Null

$downloads = @(
  @{ File = "service-web-development.jpg"; Id = "m_HRfLhgABo" },
  @{ File = "service-seo.jpg"; Id = "JKUTrJ4vK00" },
  @{ File = "service-digital-marketing.jpg"; Id = "r0saAQNjEjQ" },
  @{ File = "service-design-branding.jpg"; Id = "8dgFq8Vbelo" },
  @{ File = "service-video-animation.jpg"; Id = "VW2oU66mwbc" },
  @{ File = "service-mobile-app-development.jpg"; Id = "9e9PD9blAto" },
  @{ File = "subservice-custom-web-development.jpg"; Id = "i1VQZsU86ok" },
  @{ File = "subservice-wordpress-development.jpg"; Id = "YBtAJPcvc4Y" },
  @{ File = "subservice-nextjs-development.jpg"; Id = "4hbJ-eymZ1o" },
  @{ File = "subservice-ecommerce-development.jpg"; Id = "Q59HmzK38eQ" },
  @{ File = "subservice-landing-page-development.jpg"; Id = "w9jKH8ZnF7A" },
  @{ File = "subservice-website-redesign.jpg"; Id = "pKRNxEguRgM" },
  @{ File = "subservice-website-performance.jpg"; Id = "HUJDz6CJEaM" },
  @{ File = "subservice-technical-seo.jpg"; Id = "shr_Xn8S8QU" },
  @{ File = "subservice-local-seo.jpg"; Id = "BJXAxQ1L7dI" },
  @{ File = "subservice-ecommerce-seo.jpg"; Id = "hpjSkU2UYSU" },
  @{ File = "subservice-small-business-seo.jpg"; Id = "sxb8StmTfaw" },
  @{ File = "subservice-content-marketing.jpg"; Id = "FHnnjk1Yj7Y" },
  @{ File = "subservice-social-media-marketing.jpg"; Id = "0cpyFsSUiSc" },
  @{ File = "subservice-paid-advertising.jpg"; Id = "qwtCeJ5cLYs" },
  @{ File = "subservice-conversion-optimisation.jpg"; Id = "bMWHu8wU1Vk" },
  @{ File = "subservice-graphic-design.jpg"; Id = "LPWl2pEVGKc" },
  @{ File = "subservice-logo-design.jpg"; Id = "Dx1b5ucschA" },
  @{ File = "subservice-brand-identity.jpg"; Id = "OEIix2awZr4" },
  @{ File = "subservice-creative-design.jpg"; Id = "v9vII5gV8Lw" },
  @{ File = "subservice-video-animation.jpg"; Id = "yk9VXp4W5-Q" },
  @{ File = "subservice-2d-animation.jpg"; Id = "l5AXHs3Dfkk" },
  @{ File = "subservice-3d-animation.jpg"; Id = "Wx2J5i1A24k" },
  @{ File = "subservice-explainer-videos.jpg"; Id = "pJwWrP-OIfk" },
  @{ File = "subservice-custom-mobile-app-development.jpg"; Id = "mxPiMiz7KCo" },
  @{ File = "industry-real-estate.jpg"; Id = "W8z6aiwfi1E" },
  @{ File = "industry-fashion.jpg"; Id = "kZicVYS8nEY" },
  @{ File = "industry-retail.jpg"; Id = "YDde9egYzhw" },
  @{ File = "industry-hospitality.jpg"; Id = "SXePqzrArfY" },
  @{ File = "industry-technology.jpg"; Id = "QckxruozjRg" },
  @{ File = "industry-professional-services.jpg"; Id = "gMsnXqILjp4" },
  @{ File = "industry-health-wellness.jpg"; Id = "IDM3n0LfNCY" }
)

$downloads | ForEach-Object -Parallel {
  $destination = Join-Path $using:outputDirectory $_.File
  $uri = "https://unsplash.com/photos/$($_.Id)/download?force=true&w=1600"
  & curl.exe -L --fail --silent --show-error $uri -o $destination
  if ($LASTEXITCODE -ne 0) {
    throw "Download failed for $($_.File)"
  }
} -ThrottleLimit 8

Write-Host "Downloaded $($downloads.Count) stock images to $outputDirectory"
