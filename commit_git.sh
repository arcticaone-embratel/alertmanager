#! /bin/bash

#rodar esse comando (./commit_git.sh) no config explorer icone menu -> 'run a shell command'
#linha abaixo -all varre todos arquivos modificados
git add --all
#colocar abaixo a msg do q foi alterado antes de comitar...
git commit -m "12nov21 - bkp inicial dia -> alterado macro all_alerts_novo / dash comportar 2 campos novos"
git push -u origin main