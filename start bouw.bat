rmdir /s /q .\public 
md .\public
md .\public\blog
md .\public\blog\2015-01-04-Archief20Jaar
md .\public\blog\2015-01-04-Archief20Jaar\movie
copy .\pages\blog\2015-01-04-Archief20Jaar\menstis.m4v .\public\blog\2015-01-04-Archief20Jaar\movie\menstis.m4v
gatsby build

