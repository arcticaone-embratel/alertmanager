#! /bin/bash

#rodar esse comando (./commit_git.sh) no config explorer icone menu -> 'run a shell command'
#linha abaixo -all varre todos arquivos modificados
git add --all
#colocar abaixo a msg do q foi alterado antes de comitar...
git commit -m "12nov21 - alterado js incident_posture_novo.js"
git push -u origin main