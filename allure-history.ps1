# Restore history BEFORE generating report
# if (Test-Path "allure-report\history") {
#     Write-Host "Restoring Allure history..."
#     Copy-Item "allure-report\history" "allure-results" -Recurse -Force
# }
if (Test-Path "allure-report") {
    Remove-Item "allure-report" -Recurse -Force
}
# Generate report (clean)
npx allure generate allure-results --clean

# (Optional) Open report automatically
npx allure open allure-report
