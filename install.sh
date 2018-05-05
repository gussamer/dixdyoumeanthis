#!/bin/sh
cd /tmp
git clone https://github.com/gussamer/dixdyoumeanthis.git
sudo cp dixdyoumeanthis/dixdyoumeanthis.js /usr/local/bin/dx
sudo chmod +x /usr/local/bin/dx
rm -r dixdyoumeanthis