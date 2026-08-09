<#
公開用スクリプト。曲を追加・編集したあと、これを実行するだけで
git add / commit / push をまとめて行います。

使い方 (プロジェクトルートまたはこのフォルダから実行可能):
  powershell -ExecutionPolicy Bypass -File tools\publish.ps1
  powershell -ExecutionPolicy Bypass -File tools\publish.ps1 -Message "曲解説を追加: カルマ"
#>
param(
  [string]$Message = "曲解説を更新"
)

$ErrorActionPreference = "Stop"
$repoRoot = Split-Path -Parent $PSScriptRoot
Set-Location $repoRoot

git add -A

$staged = git diff --cached --name-only
if (-not $staged) {
  Write-Output "変更がありません。コミットするものがないため終了します。"
  exit 0
}

Write-Output "以下のファイルをコミットします:"
Write-Output $staged
Write-Output ""

git commit -m $Message
git push

Write-Output ""
Write-Output "公開処理が完了しました。数十秒〜数分後にGitHub Pagesへ反映されます。"
