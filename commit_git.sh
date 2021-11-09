#! /bin/bash

#rodar esse comando (./commit_git.sh) no config explorer icone menu -> 'run a shell command'
#linha abaixo -all varre todos arquivos modificados
git add --all
#colocar abaixo a msg do q foi alterado antes de comitar...
git commit -m "09nov21 - alterado macro p/ comportar 2 campos / iniciado alteracao js painel_gerencial drilldowns"
git push -u origin main