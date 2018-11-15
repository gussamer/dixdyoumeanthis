#!/bin/sh
if [[ "$OS" = *"Windows"* ]]; then
    cd $TEMP
    git clone https://github.com/gussamer/dixdyoumeanthis.git
    if [ ! -d ~/bin ]; then
        mkdir ~/bin
        if [ ! -f ~/.bashrc ]; then
            echo "#add user bin to path\nexport PATH=$PATH\";~/bin\"" >> ~/.bashrc
        else
            if [ ! grep -Fxq "#add user bin to path\nexport PATH=$PATH\";~/bin\"" ~/.bashrc ]; then
                echo "#add user bin to path\nexport PATH=$PATH\";~/bin\"" >> ~/.bashrc
            fi 
        fi
    fi
    cp dixdyoumeanthis/dixdyoumeanthis.js ~/bin/dx
    chmod +x ~/bin/dx
else
    cd /tmp
    git clone https://github.com/gussamer/dixdyoumeanthis.git
    sudo cp dixdyoumeanthis/dixdyoumeanthis.js /usr/local/bin/dx
    sudo chmod +x /usr/local/bin/dx
fi
rm -fr dixdyoumeanthis