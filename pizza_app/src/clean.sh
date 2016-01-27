#!/bin/bash

. ./paths.sh

echo "SRC = ${SRC}"
echo "DST = ${DST}"

echo "removing JS files"
rm ${DST}/${JS}/* 2> /dev/null

echo "removing CSS files"
rm ${DST}/${CSS}/* 2> /dev/null

echo "removing IMG files"
rm ${DST}/${IMG}/* 2> /dev/null

echo "removing index.html"
rm ${DST}index.html 2> /dev/null



