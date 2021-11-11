#! /bin/bash

#rodar esse comando (./commit_git.sh) no config explorer icone menu -> 'run a shell command'
#linha abaixo -all varre todos arquivos modificados
git add --all
#colocar abaixo a msg do q foi alterado antes de comitar...
git commit -m "11nov21 - danilo - alterado cor azul dash / alterado macro tabelaGerencialSearch criado painel_gerencial_GRAF.csv -> dash gerencial"
git push -u origin main