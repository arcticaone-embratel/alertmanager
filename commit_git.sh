#! /bin/bash

#rodar esse comando (./commit_git.sh) no config explorer icone menu -> 'run a shell command'
#linha abaixo -all varre todos arquivos modificados
git add --all
#colocar abaixo a msg do q foi alterado antes de comitar...
git commit -m "15nov21 - alterado search quadro normalizado / horario expurgo / painel gerencial 100 per page"
git push -u origin main