#!/bin/sh
curl -o /usr/share/nginx/html/feeds/sports.js http://massdog.com/assets/feeder.php?feed=https://buzz60.com/b60-mrss/view/Tribal360%20Feed%20Sports/v5ubzz1anfx95makaz
curl -o /usr/share/nginx/html/feeds/entertainment.js http://massdog.com/assets/feeder.php?feed=https://buzz60.com/b60-mrss/view/Tribal360%20Feed%20Entertainment/unw3enu5g83fe5s84gle
curl -o /usr/share/nginx/html/feeds/trending.js http://massdog.com/assets/feeder.php?feed=https://buzz60.com/b60-mrss/view/Tribal360%20Feed%20Trending/onr2od1q9v5hrlkmwzmz
curl -o /usr/share/nginx/html/feeds/weirdnews.js http://massdog.com/assets/feeder.php?feed=https://buzz60.com/b60-mrss/view/Tribal360%20Feed%20Weird%20News/lbkbgu6jygsorrpkbptw
curl -o /usr/share/nginx/html/feeds/lifestyle.js http://massdog.com/assets/feeder.php?feed=https://buzz60.com/b60-mrss/view/Tribal360%20Feed%20Lifestyle/jgyhosoyj1q5f5o2l7e
curl -o /usr/share/nginx/html/feeds/travel.js http://massdog.com/assets/feeder.php?feed=http://travelbig.com/video-feed/

curl -o /usr/share/nginx/html/feeds/sports.xml https://buzz60.com/b60-mrss/view/Tribal360%20Feed%20Sports/v5ubzz1anfx95makaz
curl -o /usr/share/nginx/html/feeds/entertainment.xml https://buzz60.com/b60-mrss/view/Tribal360%20Feed%20Entertainment/unw3enu5g83fe5s84gle
curl -o /usr/share/nginx/html/feeds/trending.xml https://buzz60.com/b60-mrss/view/Tribal360%20Feed%20Trending/onr2od1q9v5hrlkmwzmz
curl -o /usr/share/nginx/html/feeds/weirdnews.xml https://buzz60.com/b60-mrss/view/Tribal360%20Feed%20Weird%20News/lbkbgu6jygsorrpkbptw
curl -o /usr/share/nginx/html/feeds/lifestyle.xml https://buzz60.com/b60-mrss/view/Tribal360%20Feed%20Lifestyle/jgyhosoyj1q5f5o2l7e
curl -o /usr/share/nginx/html/feeds/travel.xml http://travelbig.com/video-feed/

rsync -avz -e "ssh -i /root/rsync-key" /usr/share/nginx/html/ ec2-50-17-142-50.compute-1.amazonaws.com:/usr/share/nginx/html

