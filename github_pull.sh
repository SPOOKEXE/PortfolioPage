# remove folder if exists
rm -R PortfolioPage
rm -R portfolio_page
# kill current webiste
pm2 kill

# github clone
git clone git@github.com:SPOOKEXE/PortfolioPage.git

# Move portfolio page directory out
mv -f PortfolioPage/portfolio_page .

# Move bash scripts out
mv -f PortfolioPage/bash_scripts/* .
chmod +x restart_nginx.sh
chmod +x start_flask.sh

# move github pull out and chmod add
mv -f PortfolioPage/github_pull.sh .
chmod +x github_pull.sh

# remove empty folder
rm -R PortfolioPage
./start_flask.sh