@echo off
(echo list disk & echo list volume & echo exit) | diskpart
set /p disknum=Sel dis to install win: 
set diskpartfile=%TEMP%\diskpart_script.txt
(
echo select disk %disknum%
echo clean
echo convert gpt
echo create par efi size=512
echo format fs=fat32 quick label=EFI
echo assign letter=N
echo create par primary
echo format fs=ntfs quick label=win
echo assign letter=C
) > %diskpartfile%
diskpart /s %diskpartfile%
set /p image=Sel vols have install.esd: 
dism /apply-image /imagefile:%image%:\sources\install.esd /index:1 /applydir:C:\
bcdboot C:\Windows /s N:\
wpeutil reboot