---
layout: post.njk
title: "The critic's stories: every before / after"
date: 2026-09-20
permalink: /posts/a-critic-in-the-loop-stories/
---

An appendix to [A critic in the loop](/posts/a-critic-in-the-loop/). Every story
the 14M student wrote during the harvest, in two versions: **raw** (the unaided
student, accept-first) and **teacher-guided** (the same student, same seed, with
the critic flagging and the student rewriting each flagged sentence, then a
forced ending if it wouldn't finish on its own).

A caveat worth stating: these are *not* line-by-line diffs. Once the teacher
rewrites the opening sentence, the two versions diverge into different stories from
the same seed — so read them as "what the student produced alone" vs "what it
produced with a critic in the loop," not as one story minus its errors. All output
is raw: lowercase, and the spacing around quotes is the detokenizer's.

## Enrichment: bland → richer

A different move from the [enrichment pass](/posts/a-critic-in-the-loop/) (the
soft mode). These sentences were already gate-clean — not *wrong* — but flat or
unclear, so the student was asked for a few alternatives and the richest gate-clean
one was swapped in. Dialogue is never touched. A handful of actual swaps:

| the student's flat line | the richer line it was swapped for |
|---|---|
| timmy loved to play with his toys and draw. | timmy loved to play with his toys, but his favorite was a big, red ball. |
| on his journey, sam encountered a scary wolf. | in the forest, sam met a wise owl. |
| once there was a little girl named lily. | one day, mommy and dad were walking through the park. |
| that's not our ball. | the ball is too heavy for us. |
| she decided to take joe to get a peel. | she suggested joe share a banana. |

The first four trade a generic line for a concrete image or setting; the last is
the *clarity* side — "get a peel" is confusing, "share a banana" is not. All modest
(the 14M student can only offer what it can write), all additive: if no alternative
was gate-clean and strictly richer, the original stayed.

---

## 1  <span style="font-weight:normal;font-size:0.7em;color:#999">(11 sentences, 6 rewrites · natural ending)</span>

**Raw (no teacher):** lily and ben were playing with their toys in the living room. they also liked to pretend they were explorers and pretend they were explorers. they had a lot of fun and made noises. but then they realized that ben had a sad face and a hole in its fur." ow, ow, ow!" ben said. lily ran to him and hugged him." it hurts, ben, it hurts!" lily said. she picked up the hole and put it in his pocket. she took out the hole and ran to ben." ben, you are a bad girl!

**Teacher-guided:** upon a time, there was a little girl named lily. she loved to play outside and explore new places to explore. one day, she found a twisty log that she really wanted. she tried and tried, but it was too hard. she tried and tried, but it was hard and too hard. lily kept trying and finally, she got tired, so she went to sleep. later that day, lily's mom saw what happened and asked her where she needed it. lily told her about the log and how she said she told her that it was important to have to look for it. lily thought about it and realized that her mom was right. she was so happy and grateful for her mom's advice. the end.


## 2  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 8 rewrites · forced ending)</span>

**Raw (no teacher):** once upon a time, there was a bird called billy. billy was very thirsty and wanted to drink some juice. he found a pretty cup from a bench and decided to drink it. he took it off and drank it all over. after a while, he got sick and went to his mom. she told him that it was just a hot cocoa and not juice was not yummy. billy felt sad for what he did and tried to rub with a tissue to make it talk to his mom and not feeling well anymore. he learned that it's important to take care of even when he felt thirsty.

**Teacher-guided:** once upon a time, there was a bird called billy. billy was so happy and loved to sing. one day, billy flew out to a lake, and saw a brilliant butterfly flying around. he smiled and thought it was an incredible butterfly. suddenly, billy heard a noise." what are you doing?" billy asked. billy asked." i'm trying to fly like that. it's pretty, but it's difficult." billy said. billy looked surprised. he asked his mommy to help him and they together they flew over to the bird.


## 3  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 8 rewrites · forced ending)</span>

**Raw (no teacher):** once upon a time, there was a big white horse. the horse started to sing. he was scared and did not know what to do. he walked in the woods and found a mysterious rock. he decided to reach it, but it was gone. suddenly, the horse started to tear. he tried to stitch the rock in half, but he got hurt. he started to cry. his mom saw him crying and picked him up. she came to help him. she took him to the doctor and made sure to make sure he was safe and that he was n't scared again. the horse was so relieved and grateful to his mom.

**Teacher-guided:** once upon a time, there was a big white horse. the horse liked to run and play in the field. one day, the horse saw a big tent. the horse thought," let's go in and look!" but when they got there, the horse got hungry. the horse was sad. the horse said," i do n't know what to do. we can stay in the field." the horse did n't know what to do. then, the horse had an idea. he said," let's go on a trip to get some food!" so they took out some food and they went back to the house. when they got back home, the horse was very happy and said," thank you for the fun time!


## 4  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 8 rewrites · forced ending)</span>

**Raw (no teacher):** lily and tom are friends. they like to play in the park. one day, they see a pink ball. it is yellow and round and has a picture on it." look, lily! a red ball!" tom says." i want to buy it!"" no, tim, that is not ours! we tried the ball!" lily says. but tom is stubborn.

**Teacher-guided:** once upon a time, there was a bear. the bear was walking happily in the forest, looking for nuts to eat. suddenly, the bear heard a loud noise. the bear was scared but did not move. then, the bear saw a bow on the ground. the bear picked up the bow and was very excited. he looked around and saw some leaves. he bent down to get a better look. he found a small, shiny rock. he picked it up and smelled it. he was so happy that he started to smile. the bear smiled and said, â€œi want the gold coin! it is crunchy and itâ€ ™ s sweet.


## 5  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 9 rewrites · forced ending)</span>

**Raw (no teacher):** once upon a time, there was a little boy named timmy. timmy loved to jog in the forest with his ball. one day, timmy saw a big crocodile's mud ball in a tree. the crocodile was very big and black. timmy thought," maybe it's cleaned in a bin, so he could make another bigger mess." timmy did n't want to help but he was scared of the spider. so, he went to a nearby bush. a little bird was standing on the rock and looked at timmy with a big smile on his face. timmy said," i'm sorry, little bird. can we help you make a bridge into the woods?" the bird was happy. he waved to timmy and ran to pick up the red ball.

**Teacher-guided:** once upon a time, there was a little boy named timmy. timmy loved to play outside in the sunshine. one day, timmy's mommy said," timmy, we are going to make a sandcastle!" timmy's mommy said," i have a fancy sandcastle." timmy said," let's make one." so, they went to the ocean and saw a big sandcastle. they wanted to build one sandcastle. timmy said," let's decorate the sandcastle!" they both climbed up on the sand and had fun playing with the sand. after a while, they finished building the sandcastle. timmy said," wow, that's amazing! can i play on the sand too?"" sure, but be careful.


## 6  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 4 rewrites · forced ending)</span>

**Raw (no teacher):** sara. she has a big plate of cereal for breakfast. she likes to see favorite toys and carrots and lettuce. then she adds beans to mommy's bowl. she brings a spoon and says," can i try one?" sara is happy. she likes the cereal. she says," no, mommy, we ca n't. this is too sweet. can you understand?" her mom hugs her and says," sure, sara, you can share the bowl with me. but and now you have to be careful with the spoon.

**Teacher-guided:** mia had an invitation to school day. she wanted to be feeling happy and excited. she put on her shoes and ran to the playground. mia was so excited to learn all about the games. she stepped into the park and looked around. it was a nice playground! mia wanted to sit on the swings and swing. she ran up on the grass, feeling the sun on her face. she wanted to come back and play in the park. mia looked around and jumped on the swing. she smiled as she spun around the playground. she was so happy! mia's mom smiled too and said," i'm glad you're the best!


## 7  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 7 rewrites · forced ending)</span>

**Raw (no teacher):** once upon a time, there was a little bird. the bird loved to sing and dance around. one day, it found a shiny chain on the ground. the bird thought it was very pretty, so it decided to try. the bird picked the chain and brought it to a fire. the bird was very happy and thanked the bird. from that day on, the bird kept his loop in its own, and all of the animals were very proud of him. they knew how to fight tree in more further. the bird flew to the kitchen and ate all the way up to the ground. it was so happy that the bird was able to climb on again all the animals in the forest!

**Teacher-guided:** once upon a time, there was a little bird. the bird loved to sing and dance around. one day, it found a shiny chain on the ground. the bird thought it was very pretty, so it decided to try. the bird tried to catch the chain, but it could n't. the bird felt sad because it loved the chain. but then, the bird saw a big dog. the dog was barking and growling. the bird went home, feeling sorry to the dog. it started to cry. but then, a wise old owl came by and said," do n't worry, i will help you. you can help the bird." the bird looked at the chain and saw that it was normal again.


## 8  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 6 rewrites · forced ending)</span>

**Raw (no teacher):** once upon a time, there was a girl named lily. she loved to play with her toys and imagine things like cars and houses, and even her favorite was a shiny metal truck. one day, lily went to the park with her mommy and saw a big billboard on the park. it was so pretty and had a lot of light. lily said," mommy, can we fix the billboard, too?" her mommy said," yes, of course, we can." after they finished cleaning the billboard, lily's mommy said," i love it, but you have to be careful. it's very dangerous." lily said," i will hear you later, mommy." after they finished cleaning, lily put her favorite toy in class. she did n't want to leave the billboard before it got dark. she said," i want to play!

**Teacher-guided:** once upon a time, there was a girl named lily. she loved to play with her toys and imagine things like cars and houses, and even her favorite was a shiny metal truck. one day, lily and her mom went to the park to play. lily saw a big jeep and asked her mom if she could play with it. her mom said," sure, but be careful. the jeep can be dangerous." suddenly, the jeep fell down and broke into many pieces on the ground. lily was sad because she loved to play with her toys. but then, her mom had an idea. she took the jeep outside and got the jeep back on it! lily was so happy and thanked her mom for helping her. she could n't wait to play and find another adventure again. the end.


## 9  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 7 rewrites · forced ending)</span>

**Raw (no teacher):** once upon a time, there was a little boy named timmy. timmy loved to play with his toy boat in the water. one day, while playing with his boat, timmy's mom said they need to leave their boat on the shore. timmy said," okay, mommy. i will keep our boat safe." his mom said," me too." timmy was sad, but she knew he would be gentle with his boat. when they got home, timmy said," i'm sorry, i'm sorry, but i'm not mad at you." but then, timmy accidentally dropped his boat outside and it scattered the boat around timmy's money. he started to cry and said," i'm sorry, timmy. i'm sorry i did n't mean to buy my boat anymore." his mom smiled and said," it's okay, timmy.

**Teacher-guided:** once upon a time, there was a little boy named timmy. timmy loved to play with his toy boat in the water. one day, while playing with his boat, timmy's mom said they need to leave their boat on the shore. timmy said," okay, mommy. i will come with you." so, they left the boat and watched the sun start to set. timmy got excited and started walking on the beach. as he got to the water, he saw a big yellow bird flying towards timmy. timmy said," wow, that pretty bird is so pretty!" his mom smiled and said," you're right, timmy. it's very pretty by me." timmy felt proud and he knew he had to leave his boat alone. from that night on, timmy always looked out for ways to explore the water.


## 10  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 11 rewrites · forced ending)</span>

**Raw (no teacher):** anna and ben are playing with their toys in the park. they have a big box of toys in the park. they see a big truck with a handle on the street. the truck wants to drive faster." can i have the truck, ben?" mia asks." no, it is not safe," ben says." it is my truck." it needs some space, but they need to be careful. it needs fuel," anna says." it will only help you clean the truck." they clean the truck with the truck.

**Teacher-guided:** once upon a time, there was a little boy named timmy. timmy loved to draw and collect squares. one day, he found a big box in his backyard. he wanted to open it, but he did n't know how. timmy asked his mom," what's that?" his mom replied," it's a special box, timmy. it's very important to see what's inside." timmy was excited to open the box and found a lot of different squares. he was happy to have found them all together. later that day, timmy's mommy came into his room and said," timmy, it's time for dinner for dinner!" timmy excitedly opened the box and found a beautiful new square and he thinks it was his favorite color. he had never seen anything like it before. from that day on, timmy always remembered how powerful he was and kept his original creations.


## 11  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 8 rewrites · forced ending)</span>

**Raw (no teacher):** once there was a crab named fin. fin was very clever and did not talk helpful. one day, fin saw a big, open box. he wanted to see what was inside. fin tried to open the box, but it was too heavy. fin tried to lift it, but it was too heavy. he tried to lift the box, but it was too heavy. fin tried to push, but he could not. fin became very sad and went home. he tried to clean the toy box but it was too heavy. the tape broke and tim fell to the garden. he was sad and cried mom for help.

**Teacher-guided:** once there was a crab named fin. fin loved to swim in the ocean. one day, fin decided to go to a new island to find a home. fin saw a small, smooth rock in the sea and thought," this rock is so cool. i think it's special." so fin enjoyed playing with the rock but then, a big wave came and blew the rock down. the rock was sad that fin could not find it back. fin tried to get the rock back, but he could not find it. fin thought for a moment and then he had an idea. he would ask his friends to help him find it. they all gathered together to look for the rock. they searched and searched all around the sea, but could not find it. fin found a new place to hide the rock.


## 12  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 6 rewrites · forced ending)</span>

**Raw (no teacher):** once upon a time there was a girl named freya. she was three years old and loved to go on adventures. one day she decided to go to the beach. as she arrived, she saw a warm blue wave and the waves were mighty. she ran to the waves and smiled. suddenly, she saw a pretty rainbow! she caught it and carried it back inside. freya was so happy to have found such an amazing sight. she stepped inside and saw that the rainbow was filled with beautiful colors. she smiled and beamed. she thanked her mum and ran off, feeling proud of herself for being so brave. the end!

**Teacher-guided:** once upon a time there was a girl named freya. she was three years old and loved to go on adventures. one day she decided to go to the beach. she showed her mom all the things she could find. before she could, her mom told her not to worry. after a while her mom came over to see what was happening." what's wrong, honey?" she asked. her mom asked." i'm sorry because i'm worried." she asked." it's okay," her mom said." but it's not good to be afraid.


## 13  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 6 rewrites · forced ending)</span>

**Raw (no teacher):** max likes to play with his toy truck in the yard. he also likes to put it in his car. one day, he sees a car outside. he wants to play with it, but he thinks it is too heavy. he tries to pull it, but it is too heavy. he tries to lift it open, but it does not move. he tries to push it with his finger, but it does not move. mom sees max struggling. she says," max, you need some wheels. you need to fix it with a scale. you need to fix it later, not that is coming soon." she turns her hammer and fills it with water.

**Teacher-guided:** tom and lily were playing in the park. they liked to run, slide and jump. one day, they saw an enormous slide. they wanted to go down the slide, but tom's mom said no. she said it was dangerous. tom did not listen. he fell down and hurt his knee. lily cried and cried. mom came to help. she saw the slide and the other children. she was angry. she said," tom and lily, i told you not to go yet. you have to be careful and listen to me before you go home.


## 14  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 6 rewrites · forced ending)</span>

**Raw (no teacher):** once upon a time, there was a sad squirrel named carl. carl went outside to play with friends." i want to play with you," said carl. the squirrel and carl did not want to share. but carl wanted to learn how to play with carl. carl said," friends, i will use!" carl thought for a moment and said," let's take turns sharing this game!" carl agreed and they both played hard on the ground. kim gave carl a big smile and carl both became best friends. they were both very happy when they played together in the sun. from that day on, carl and carl always shared and shared their fun times together.

**Teacher-guided:** once upon a time, there was a sad squirrel named carl. carl went outside to play with friends." i want to play with you," said carl." do you want to play with me?" carl laughed and said," yes! let's play!" so they played together and had lots of fun. they became very good friends. carl even made sure to hide and seek. carl was happy because he was not sad anymore. from then on, carl was the best of friends. they always kept their company when they played. the end.


## 15  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 11 rewrites · forced ending)</span>

**Raw (no teacher):** tim and sam were playing in the park. they saw a big truck near the swing and ran to it. they ran to the truck and touched it with him." help! help!" tim shouted." the truck is in the way!"" sam heard them and came back. he saw the truck and he wanted to stop it." the road is too big. mom, warn us!" he shouted.

**Teacher-guided:** once upon a time, there was a pirate named tom. tom was very happy because he was a good pirate. one day then, tom saw a cat stuck in a tree. he wanted to help the cat up. but the cat was weak. tom wanted to help the cat. tom had an idea. he took a stick and tried to pull the cat. the cat was surprised and happy. but then, the cat stopped and went back to tom. tom said," i will help you and the cat is very nice." the cat was surprised and said," thank you, tom. but you are also very nice.


## 16  <span style="font-weight:normal;font-size:0.7em;color:#999">(9 sentences, 5 rewrites · natural ending)</span>

**Raw (no teacher):** once upon a time, there was a little girl named lily. she had a diary that she loved about writing. one day, her mommy came into the room and said," wow, lily! what is you doing?" lily looked up and said," i'm writing something in my notebook. let's need to give it back to me, so it wo n't be any longer much better." and. so, lily went to the store and saw a big blackboard crying a lot of puzzles for her. she climbed up and asked her mommy," what's wrong?"" i'm not really seeing my magazine," said lily." it's tough," replied her mommy. lily got to work and calmly pulled the chalk to the table.

**Teacher-guided:** once upon a time, there was a little girl named lily. she had a diary that she loved about writing. one day, she asked her mommy to help her make a fun game, but her mommy said," why do n't you try to write on your diary?" lily did n't know what to do. she said to her mommy," mommy, i need a teaspoon to draw a picture of a bird and you need it to be done." her mommy said," do n't worry, lily. i will help you write?" lily was so happy and smiled. she thanked her mommy and decided to write her a picture for her family.


## 17  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 7 rewrites · forced ending)</span>

**Raw (no teacher):** lily loved to eat cereal with her mom in the garden. she always liked to eat her cereal a lot. one day, her mom asked her what she wanted for. lily said," i want to make cereal for cereal, please! i want to eat cereal first!" her mom said," time, time making milk on your cereal. you need to wear your teeth for your cereal cereal." lily did not want to wait until she was hungry. she wanted to eat cereal while her mom was eating. her mom said," lily, you need to take whatever you need." lily thought about it and promised to be patient. later that day, her brother timmy came into his room and asked," what's wrong?

**Teacher-guided:** lily loved to eat cereal with her mom in the garden. she always liked to eat her cereal a lot. one day, her mom told her that they were going to get a new cereal. lily was sad because she could n't eat it. her mom made some cereal for dinner. lily's favorite toy was a little bunny. she loved to play with her toys and have fun. one day, lily's mom asked her to help her make some sweet cereal for dinner. lily was happy to help and they went outside to get the cereal. lily and her mom mixed some fruits in the bowl. lily loved the fruits and started to chew with her cereal. she chewed them all up in the bowl and admired how soft the cereal was. her mom was happy too.


## 18  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 7 rewrites · forced ending)</span>

**Raw (no teacher):** ben likes to eat cereal that made him happy. he likes to smell the healthy milk. sometimes he has cereal, lemon curls, and small cereal. he likes to make food and make his bed clean. one day, ben sees that his bowl is dull. he wants to play with his bowl, but he does not want to eat the cereal. he thinks he might hurt his mouth. he thinks his mom is not happy. he wants to help him. he takes a broom from his mouth and puts it in a chair. he gives it to his mouth and shows it to his mouth. he makes it bug happy.

**Teacher-guided:** tim and sue have a new toy. they go to the park and play. they see a big blue ball. they run to the ball and bounce the ball. they take turns to bounce the ball. they laugh and have fun. but then, they see a big red ball near them. the ball is broken." i ca n't reach the ball," tim says. he tries to lift the ball." no, tim, stop jumping!" sue says. tim is sad.


## 19  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 7 rewrites · forced ending)</span>

**Raw (no teacher):** once upon a time, there was a little dog named max. max loved to play with his toys all day long. one day, max and his mommy went to a park. max saw a big rock that he loved to play. he ran down to his mommy and said," look mommy, i found a shiny toy!" his mommy smiled and said," that's a pretty rock. let's see if we can find treasure in the park." so, max and his mommy went to the park. there, they saw a wide tree with a flag on it. max started to laugh and made a big tower. max and his mommy laughed and went home. max was so happy to have found such a pretty castle.

**Teacher-guided:** once upon a time, there was a little dog named max. max loved to play with his toys all day long. one day, max and his mommy went to a park. they played hide and seek and had so much fun. max was very good at hiding and he did n't want to get home. then, he spotted a cloud in the sky. it was a graceful cloud that made him feel happy. max said to his mommy," what's that cloud?" his mommy said," that's a beautiful cloud. let's play hide and seek." max wagged his tail and had an idea. he really liked the fun. max and his mommy sat down and patted max.


## 20  <span style="font-weight:normal;font-size:0.7em;color:#999">(10 sentences, 8 rewrites · natural ending)</span>

**Raw (no teacher):** anna and ben are friends. they like to play in the park. they have a lot of fun. they have a big tower of fun. they have fun. but then, their mom is not looking. she is angry." ben, what did you do?" mom asks." you need to go to the park. you have to play with your blocks first. you have to help me go up and down.

**Teacher-guided:** once upon a time, there was a little girl named lily. she loved to play with her toy dolphin. one day, she went to a festival with her mom and saw a big puddle. she asked her mom," can i play on the wet puddle?" her mom nodded and said," yes, of course, lily!" lily played on the swings and had so much fun. when it was time for bed, lily gave her mom a big hug and said," goodnight, pretty!" lily felt happy and said," thank you, mom. i'm happy to have you to come back tomorrow and play." the end.


## 21  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 7 rewrites · forced ending)</span>

**Raw (no teacher):** once upon a time, there was a little girl named lily. she loved to play with her toys in her room. one day, she saw a long chimney with lots of numbers and numbers around it. lily asked her mommy," what's these numbers?"" that's a very small," replied lily." these we want," said her mommy. so, lily and her mommy went to pick some oranges. lily saw a big green banana tree and decided to help it look high again. she was very careful and told her mommy she could use it to reach. her mommy smiled and said," that does n't weigh out!" then she carefully picked out some oranges and showed her how to climb the tall stream together. lily was very happy and grateful for her for the kind gesture.

**Teacher-guided:** once upon a time, there was a little girl named lily. she loved to play with her toys in her room. one day, she saw a big box near her room." what's that?" asked lily." that's a toy," replied her mommy." that's a toy! it's big and gray. it's hard." lily thought about it and wanted to play with it. she asked her mommy if she could play with it too. her mommy said yes and they played with the toy together. soon, it was time for bed.


## 22  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 5 rewrites · forced ending)</span>

**Raw (no teacher):** once upon a time, there was a big jungle. they had a lot of fun going on the next day. in the jungle, they would find great new friend. one day, they were at a special kind and generous forest. the animals looked out the stairs and thought," let's go!" the animals in the jungle all thought it was the most fun to do with the animals in the forest. they all ran around, and they were both very happy. the animals ran and explored the forest a long time until it was time to go home. the animals stayed for a long time and were tired but happy because they had forgiven the animals. the moral of the story is that even if someone needs help. it also important to be kind to others after. it will always be ok to make the animals happy.

**Teacher-guided:** once upon a time, there was a big jungle. in the jungle, there was a hidden box. the box was very interesting. the lion wanted to play with the box. so, he started to play with the box. he threw the box on the ground and the box started to roll. he was having so much fun! suddenly, the box broke! the lion became very sad. he cried and cried. his mom came and saw the mess. she was very sad and asked what happened. the lion said that he broke the box and he was very sad.


## 23  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 6 rewrites · forced ending)</span>

**Raw (no teacher):** once upon a time, there was a little boy named tim. tim loved to play hide in his room. he would hide behind the cabinet, in the cabinet, in his room, and even in the hall. one day, tim went to his room and found a soft ball. he hid his in the cabinet and did not find it anywhere. tim heard a noise behind the cabinet. he thought," excuse me, tim, for this ball! can i play with it, please?" tim said," yes, you can play with it." tim played with the ball all day. they would jump, jump, and throw the ball together. in the end, they both laughed and had a great time.

**Teacher-guided:** once upon a time, there was a little boy named tim. tim loved to play hide in his room. one day, tim found a cloth in his room. he decided to play with it. tim tried to wipe the cloth clean. he took the cloth to the floor and cut the cloth. he looked around and saw a shiny wrap on the table. it was colorful and shiny. tim thought it was so pretty! after playing for a while, tim took the wrap and went to his mom's room. they knocked on the door and said," my toy is clean and colorful!" tim looked at the wrap and said," yes, it looks fun!" his mom smiled and wagged her head.


## 24  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 8 rewrites · forced ending)</span>

**Raw (no teacher):** tom and lily were twins who liked to play with their toys. they had many toys, but their favorite was the living room, and their favorite was a teddy bear." look, mom, a teddy bear!" tom said." maybe it is a toy. they are going to the store and have fun."" me too, tom," lily said." but we have to leave my tv first. the cars and the cars are very expensive." mom said." but we have to feed the cars. the cars are big and bumpy.

**Teacher-guided:** once upon a time, there was a little girl named lily. she loved to play with her toys and her favorite was a big, soft teddy bear. one day, lily ran to the park to play with her toys. it was so much fun! as lily played, she accidentally dropped her toy car." oh no!" she cried." i'm sorry, my car!" her mom hugged her and said," it's okay to help me. i'm glad you did n't break it." lily felt better and continued to play with her toys. she had so much fun it that she wanted to share her toys with her mom. and her mom became good friends and shared their toys with her a big smile.


## 25  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 8 rewrites · forced ending)</span>

**Raw (no teacher):** sara and tom are playing with their toy cars in the living room. they make houses and houses and cars and stickers. sara likes to make cars of cars or cars in the color. she makes them cars, cars, cars, and blocks. she also makes cars and cars and cars go everywhere." barky, mira, to my train!" sara says." it is my car and i'm going to load it with four cars. can you teach me how to drive it?" tom nods and smiles. he says," of course, sara! you have a very fast car and i can drive it carefully than yours.

**Teacher-guided:** once upon a time, there was a girl named lily. she loved to play outside with her friends. one day, lily's mom asked her to put on her shoes. lily was happy because she thought of a nice hat. she sat under a big tree and looked around to look for her hat. she looked up at the tree and saw a beautiful chain. she was excited to share her hat with her friends. while she was playing, she found a beautiful red ball on the ground. she felt happy and forgot about the chain. as she played, she saw a bird flying in the sky. the bird flew away and lily watched as the bird flew closer and saw that the chain was gone. she looked up and saw that the chain was gone. she was sad and tired.


## 26  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 10 rewrites · forced ending)</span>

**Raw (no teacher):** sara and ben are friends. they like to play together. one day, they see a big tree. the tree has many leaves." look, ben, the leaves are soft and sharp." sara says." it is very slippery!"" no, sara, the leaves are big. they are big and small and dirty. they are hard and focused." ben says." they are almost done!

**Teacher-guided:** once upon a time, there was a bald man. he had a red toy car that he loved very much. one day, he went to a park with his mom. he saw a big, blue ball too. he asked his mom," can i play with the ball?" his mom replied, â€œsure, but be careful not to drop it, because it might break easily. no matter how much you do, he will be careful." the bald man was very excited. he wanted to play with the ball and take it home. but when it was time for bed, he heard a loud snap. he tried to jump, but it was too late. the bald man tried to jump, but it did not fit in his hands. the bald man started to cry.


## 27  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 6 rewrites · forced ending)</span>

**Raw (no teacher):** once upon a time, there was a boy named timmy. timmy loved to play outside there. one day, he saw a model that made them look pretty. timmy wanted to play with the model and showed it to his friend, johnny. johnny said," let's play tag and you can play tag!" timmy said," okay, let's play!" they went under the yard and had so much fun. when timmy got home, he asked his friend," can we play?" sally said," sure, let's play tag and have fun." timmy started having so much fun that they both wanted to do it. after a while, they got tired and said," i had fun playing with you!" timmy said," me too, sally!

**Teacher-guided:** once upon a time, there was a boy named timmy. timmy loved to play outside there. one day, he found a toy in his backyard. he thought it might be fun to explore. so, timmy brought the toy back and brought it to his friend, sally. sally was very happy to see timmy. they played together all day long. after a while, timmy's friend sarah came over to play." hi timmy! can i play with you?" he asked." sure, my toy is for playing with me. let's play together!


## 28  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 9 rewrites · forced ending)</span>

**Raw (no teacher):** tom and jen are friends. they like to play. they like to draw numbers and colors. the stars are big and thin. they fold the pastels and put them together. they are very happy. then they see an enormous tower. it goes up and down." wow!" anna and sam say." look, a big truck!"" let's get the colors and start to twist the triangles.

**Teacher-guided:** once upon a time, there was a small bird. the bird loved to sing. it sang songs and danced. one day, the bird saw a big, wide tree. the bird wanted to sing. it flew to the tree and tried to sing. the bird was very excited! it sang very loud. as it sang, the bird heard a loud noise. the bird thought it was a big, scary bear." help, help!" the bear said. a little bird came to the tree and said," i can help you.


## 29  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 8 rewrites · forced ending)</span>

**Raw (no teacher):** tim and jen are friends. they like to play in their garden. one day, they see a big red ball. the ball is red and soft." tom, what is that?" jen asks tim." we want to play with the ball."" because the ball is green. green?"" me too," tim says." the cars are not for our cars. they are not good for my cars and trucks.

**Teacher-guided:** lily and tom were playing in the park. they saw a red ball on the edge. they wanted to play with the ball." can we play with the ball, tom," lily said." ok, but be careful. the ball is very high and high. we can not reach it." tom and lily went to the park. they saw a big tree. they wanted to pick it up. but they were scared. they decided to try to pull the ball, but it was too high. they both pulled the ball from each other.


## 30  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 7 rewrites · forced ending)</span>

**Raw (no teacher):** once upon a time, there was a little girl named lily. she loved to play with her toys and take everywhere she went. one day, lily's mommy came into him and said," lily, your toys is uncomfortable. it is not good for you." lily was sad, but her mommy told her they would be good. lily did n't understand why her mommy told her about cleaning. she gave her a cloth to polish her dress and put it in a cup. she also used a cloth to make her bike fit again. when she was done, lily was so happy with her new wand. but when she was finished cleaning, she felt happy because she loved her new messy dress.

**Teacher-guided:** once upon a time, there was a little girl named lily. she had a notebook that she loved very much. one day, she found a shiny metal thing on the ground. she thought it was very shiny and pretty. lily took the shiny thing home and showed it to her mom." what's this?" asked lily." it's under a leaf," her mom replied. lily felt excited when she saw the shiny thing!" i wonder what it is. what's that thing?" she asked. her mom smiled and said," it's a special thing of a pretty bug at home.


## 31  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 5 rewrites · forced ending)</span>

**Raw (no teacher):** once there was a little girl named lily. she loved to play with her toys and eat candy all day long. one day, she took her toys to a high mountain. when she got to the top of the mountain, she fell down and hurt her arm on a big box. she started to cry and started to cry. her mom heard her and came to hug her." what happened here?" she asked. lily felt better and said" i tried to fix my arm. i feel so sad," she said. her mom hugged her and said," it's ok, i forgive you". later that night, lily took her to find her's bandage and she opened it.

**Teacher-guided:** once there was a little girl named lily. she loved to play with her toys and eat candy all day long. one day, she took her toys to a high mountain. she was very happy because she loved to play outside. but one day, she had an idea. she wanted to build a tower with blocks. so, she set up the blocks and made a big tower out of blocks. as she worked, she started to build a tower that was more fun. her tower looked very tall. lily was very happy that she had made a good tower. from then on, lily could n't wait to build another tower. she always kept building her tower straight and taller until she was done. she felt proud of herself for giving her tower a proud friend to help.


## 32  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 8 rewrites · forced ending)</span>

**Raw (no teacher):** once upon a time, there was a fancy lion. the lion was very special but he was very small. he loved playing on the floor a lot. one day, the lion's friends were walking for a walk. the lion was feeling sad because he could not move. then, the lion came into the room. his friend was very nice to him and they talked together. the lion felt better and said," thank you, lion! i'm happy to help. i will surrender to you." the lion smiled back and went away. the lion made a big mess in the room.

**Teacher-guided:** once upon a time, there was a fancy lion. the lion was very special but he was very small. he loved playing on the floor a lot. one day, the lion saw a shiny red ball. he was very happy to have picked it up. the lion wanted to play with it. he grabbed the ball and threw it to the ground. the lion was happy. he played with the ball all day. he watched the ball go around, chasing after it. the lion felt like he could play with it again. he played with the ball all day long. he was very happy to be back.


## 33  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 9 rewrites · forced ending)</span>

**Raw (no teacher):** tom and ben are friends. they like to play with toys in their room. but sometimes they fight nice things. one day, they find a new shiny magnet. it is shiny and shiny. it is shiny." wow, that is shiny!" tom says." can i poke it too?"" no, tom. it is dangerous. it might be dangerous.

**Teacher-guided:** once upon a time, there was a little girl named lily. she loved to play in the park. one day, she saw a thief at the park. the thief was hungry and wanted to eat the candy. lily wanted to help the thief. she asked the thief," why are you sad?" the thief replied," i am hungry." lily thought for a moment and then said," it's okay. i can help. here you go!" the thief was happy and thanked lily. lily was happy that she could help the thief. she hugged the thief and continued to play with her toys.


## 34  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 6 rewrites · forced ending)</span>

**Raw (no teacher):** once upon a time, there was a little boy named tim. tim liked to play in the forest. one day, tim found a new piece in the forest. he was very happy. as he played, he started to jump even higher. the boy laughed and laughed. tim wanted to get the piece too. his friend, sue, came to play. she gave tim a big hug and said," thank you, tim!" tim smiled and said," can we play together?" they played all day, laughing and shouting.

**Teacher-guided:** once upon a time, there was a little boy named tim. tim liked to play in the forest. one day, he saw a big rock on the ground. he ran over to it and picked it up. but tim did not think it was a toy. he thought it was funny. tim met a big dog named sam. sam was nice! sam said," i have a gift for you." tim smiled and said," great!" they learned how to play catch with the rock. they had so much fun making something new. they became best friends and became good friends.


## 35  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 8 rewrites · forced ending)</span>

**Raw (no teacher):** once upon a time, there was a fat cat named pat. pat loved to read books. one day, pat's mom told him that all his toys needed to tidy up. pat was ready to prepare for his nap. while he was running, he heard a loud noise. he looked around, but he did n't see a big fire coming closer. pat listened carefully and then got close again. he stretched his arms up and pulled, but it was too crowded. pat was scared and ran to his mom. his mom was very happy to see him feeling proud. she was very proud of himself and asked him what was wrong. pat told her he was sorry and promised to be patient soon.

**Teacher-guided:** once upon a time, there was a fat cat named pat. pat loved to read books. one day, pat's mom made him a new bed. pat was so excited to read books. when he got to the bed, his mom asked him to check on the curtains. pat tapped his head, feeling excited. his mom said, â€œcome on, pat! you are so sweet! i made a new bed for you! i'm so happy!" pat nodded in agreement, and he snuggled up in bed straight away. it was a nice place for pat on a bed, and he smiled. after kissed him goodbye, pat opened his eyes and said," thanks for your hard work.


## 36  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 10 rewrites · forced ending)</span>

**Raw (no teacher):** once upon a time, there was a little girl named lily. she liked to visit her grandma every day. one day, lily's mom asked her to help rake so she could print some leaves within the garden. lily was very excited and finished her print. she took out a big bowl of leaves and started to print some leaves. she glued one and some leaves, while she printed one 10. lily was happy because she loved her picture so much. she took the bowl dish to her grandma." mommy, this is a big red garbage! thank you, lily! you look so tidy! i'm so happy i done!

**Teacher-guided:** once upon a time, there was a little girl named lily. she liked to visit her grandma every day. one day, lily's mom asked her to come and play extra day. lily was very happy to learn new things and start playing with her toys. she had so much fun running around and throwing the toys. when it was time to go to bed, her mom asked her to come inside with her. lily took out her favorite toy and put it at her bed, she went to bed and fell asleep. the next morning, lily woke up and felt a scary feeling. she felt scared again and again! she started to cry and cried. her mom heard her cry and came to her." what's wrong, sweetie?" she asked.


## 37  <span style="font-weight:normal;font-size:0.7em;color:#999">(10 sentences, 8 rewrites · natural ending)</span>

**Raw (no teacher):** sara and ben are twins. they like to play in the park. but today was their mom packed them a big bag with bags. sara and ben were scared. they had a bad trip to their room. the door would open and see what they did. they started to argue with their cars. mom gave them a bowl of milk and a plate of milk. she also gave them each a bag of milk and a glass of milk. she brought them back to sara and ben and blinked their eyes." thank you, mom!" sara and ben said.

**Teacher-guided:** once upon a time, there was a little boy named timmy. timmy loved to play with his toy boat near the sea. one day, he went to the sea with his mom. there was a big wave coming out of the sea. timmy was scared. but he did n't know what to do. then, he saw a pretty crab on the water. timmy was so happy and excited to tell his mom. they played in the sea and had so much fun. they laughed and laughed and had a great time.


## 38  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 9 rewrites · forced ending)</span>

**Raw (no teacher):** girl loved to read books and running around the world. one day she found a pen made of colorful shapes and colors. she was so excited to discover what she could test it. she scooped a piece of paper and showed it to her mom. her dad smiled and they both took the pen home. the little girl enjoyed her quest around the garden and imagined that she had discovered something special. she went to the kitchen and tried to finish supplies and set out her pen to complete the exam. the little girl had never seen such a drawing before. she had had been so proud of herself and every time. the little girl continued to make her compass come true. she could n't wait to explore the world again.

**Teacher-guided:** once upon a time, there were two friends named bella and max. bella was very smart and always liked to play together. one day, bella and max were playing with their toys when max popped the colorful ball. bella said," this is my ball. it is mine. it belongs to me again." max thought for a moment and said," i just want it." bella said," no, my ball is mine. i am not fair. do you want to go first?" max thought for a moment and then he agreed. bella said," okay, max. we can be best friends.


## 39  <span style="font-weight:normal;font-size:0.7em;color:#999">(11 sentences, 8 rewrites · natural ending)</span>

**Raw (no teacher):** mum in her house. she loved the kitchen. one day, mum made a cake on the table. when they came back, mum said," let's soak up the cake." mum laughed and said," well, let's have chocolate." they both agreed and started to stir her batter. it was a very tall idea and it was very lot of better. the first one was baking it had been cooked and it tasted delicious! mum was so happy. she said," let's put the cake into the oven and then we can make icing." the cookies were delicious and their yummy faces smiled.

**Teacher-guided:** once upon a time, there was a little girl named lily. she loved to play with her toys all day long. one night, she wanted to clean her room and clean up her toys. she went to her room and asked," can i clean my toys?"" yes, please!" her mom said. lily liked to help and clean up her messy room. she worked hard and made new room clean. she was very happy to help her mom, and they all smiled at each other. after they finished cleaning, lily's room was complete and lily was very happy. she knew that she had done a good job and could always clean up her room.


## 40  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 6 rewrites · forced ending)</span>

**Raw (no teacher):** once upon a time, there was a little boy named timmy. timmy loved to draw with his crayons. he liked to make big pictures of his mom and the picture of his favorite animals. one day, timmy's little brother came into his room. it was messy. timmy was sad because he did n't know where his crayons scattered." oh no!" he exclaimed." it's not yummy," his mom said." let's build a big castle together!" timmy got angry and closed his eyes." i'm sorry," he said.

**Teacher-guided:** once upon a time, there was a little boy named timmy. timmy loved to draw with his crayons. he would practice using the crayons and draw pictures. one day, timmy's little brother came into the room. he saw the crayon and thought it looked very funny. timmy started to take the crayon and drew a big, green picture. he was very happy and loved it too. timmy's little brother saw that timmy had an idea and asked their mommy why he needed the crayon. his mommy explained that it's important to share. timmy thought about it for a moment but then he had an idea. he said," let's draw a picture of something special!" timmy was very excited and said," okay. let's draw it together.


## 41  <span style="font-weight:normal;font-size:0.7em;color:#999">(10 sentences, 5 rewrites · natural ending)</span>

**Raw (no teacher):** once upon a time, there was a little girl named lily. one day, she went to the park with her mommy. while they were playing, lily saw a colorful parrot whistling on a tree. the parrot had many colors like a high tree. lily wanted to touch it, but she did not know how to touch it. so, she took a big bite of the parrot and realised that she was trying to reach it. she picked it up and carried it back to her mommy." mommy, i told you not to touch the little girl," said lily. her mommy watched the parrot and said," you're very brave. you helped me touch the parrot, okay?" lily giggled and said," yes, it is." the parrot was happy and said," thank you, lily.

**Teacher-guided:** once upon a time, there was a little girl named lily. one day, she went to the park with her mommy. while they were playing, lily saw a colorful parrot whistling on a tree. she asked her mommy," can i hold it?" her mommy replied," no, sweetie. the big bird is too high there." lily was sad because she loved the parrot. so, her mommy took her to the park. the bird was happy again and showed lily how to sing. lily felt happy and thanked her mommy.


## 42  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 9 rewrites · forced ending)</span>

**Raw (no teacher):** lily and ben were twins who liked to play outside. they had a big carpet that tasted very good. they made a lot of noise that their mom said," i need to tell you not to show her what it was for dinner." the twins turned around and looked at the carpet. it had two pieces and mixed them with a shock. lily and ben confused and sad." what's wrong?" they asked. they did not know the tv was a new toy they wanted. mom smiled and said," it's not a real tv. it's fake. maybe it's not.

**Teacher-guided:** once upon a time, there were two friends, sam and ben. they found a special shiny diamond in the forest. they showed it to their friends and smiled." look at this diamond!" said sam. they all squealed in wonder. sam smiled." i want to try it!" so they opened a comfortable blanket and went outside the forest. sam and ben put on their shoes and smiled. they looked around and saw all the things. they thanked their friends and walked back home. sam and ben had a wonderful day.


## 43  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 8 rewrites · forced ending)</span>

**Raw (no teacher):** lily was a pretty lady who always wore a pretty dress. she loved to wear her pretty dress every day before she played with her toys. one day, lily accidentally spilled it all over a shelf. she was very sad because she could n't fix it. she tried to fix it, but it was too hard. lily was so mad that she had to keep the shiny all her favorite powder. she tried to copy too, but the vase was n't hard for her. she got frustrated and started to cry. her mommy came outside and saw what was wrong. lily told her that she lost her favorite vase. she picked up lily and apologized to her. it was okay, lily learned that it's important to be careful and not take it.

**Teacher-guided:** once upon a time, there was a little girl named lily. she lived in a small house with her mom and dad. one day, lily was walking in the park when she saw a big butterfly. she wanted to catch it, so her mom said," be careful, lily. it was very pretty!" lily ran to the butterfly, and it looked like a butterfly. she said," hello, butterfly. do you want to catch me?" the butterfly said," yes, i want to catch you, but you have to be careful. it might be dangerous!" lily ran away as fast as she could. she laughed and laughed. the butterfly flew away, leaving lily alone in the sunshine.


## 44  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 9 rewrites · forced ending)</span>

**Raw (no teacher):** once upon a time, there was a little girl named lily. she loved to play with her toys, especially the newspaper. one day, she went for a walk and saw an arrow lying on a tree. she wanted to touch it, but her mommy said," no, we have to be careful and listen to the paramedics. it might not go too far. it might be dangerous." lily felt sad, and felt a little ashamed, but she knew she had done something wrong. she went to her mom and told her," it's okay, i'm okay. i ca n't touch the arrow. but it's okay." her mom trusted and ran back to her room. lily learned that sometimes, it is important to respect the rules and to ask for help.

**Teacher-guided:** once upon a time, there was a little girl named lily. she loved to play with her toys, especially the newspaper. one day, she woke up and saw a big, scary dog in the living room. she was scared and ran to her mom, who was scared. lily's mom told her that the dog was getting too scared to go away. lily did n't want to leave the dog, but she stopped feeling very scared. later that day, lily's mom came into the room and noticed that the newspaper was missing." what's wrong," she said." it's just a toy. it's a toy. we can find it under the couch." lily thought for a moment and then she had an idea." let's bring the newspaper to our backyard and show it to our parents about our discoveries.


## 45  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 9 rewrites · forced ending)</span>

**Raw (no teacher):** once upon a time, there was a little girl named lily. she loved to play outside in the rain, but she was afraid. she thought it was a good way to make her home. one day, her mommy gave her a new umbrella. it looked like a toy, but it was n't expensive. lily felt sad. she wanted to play with her new toys, but her mommy said no. lily had an idea. she went to the store and bought her new umbrella. lily was very happy and thanked her mommy for the powder. she hugged her mom and felt proud of herself for giving her a new home.

**Teacher-guided:** once upon a time, there was a little girl named lily. she loved to play in the park, but one day she went to the park with her mommy. she saw a green ball on the ground. she wanted to play with it, so she asked her mommy if they could play with it. her mommy said yes and they played together. while they were playing, they saw a big red ball on a bench. lily asked her mommy if they could play with the ball. her mommy said yes and they had so much fun playing with the ball. after they finished playing, lily asked her mom if they could play together some more. her mom said," sure! let's go to the park and have fun." lily was happy and said," yay! i had fun with you.


## 46  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 7 rewrites · forced ending)</span>

**Raw (no teacher):** lily and tom were playing in their room. they liked to pretend they were builders, or puzzles, and books." let's pretend we are pirates, matey," said lily." maybe we can pretend i am pirates, or honest, or then you will like to be pirates or not bother us."" ok, let's go!" said tom." but be careful, it is not a fish," said lily. they ran to the water and put the shovels in their shovels. they pulled the pirates out and the shovel. they pretended to be pirates, throwing fish and pulling them up. they shouted," wait, we're pirates and i will jump. i'm sorry, kids.

**Teacher-guided:** lily and tom were playing in their room. they liked to pretend they were chefs and cook yummy food. but they also did not want to make a mess for mom or dad." tom, why do you make a cake with a spoon?" mom asked." how about we make cookies and soup?"" we are making yummy cookies, mom," tom said." we can help each other. or we have fun and share and take turns," mom said." not now we can have a snack at the table." lily thought for a moment." okay, mom. we can do that.


## 47  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 8 rewrites · forced ending)</span>

**Raw (no teacher):** lily was a long and shy girl. she liked to run and play with her toys and make up stories. one day, she saw a big dog in the park. the dog was fluffy and had long tail. lily wanted to pet the dog, but the dog said it was too deep. lily was sad, but she was sorry for the dog. she went to him and gave him a big squeeze of water. she dried her hands with a big bite and felt better. she smiled and said thank you. the dog wagged his tail and said," you do n't worry, lily. i will give you a bath and i'll show you how to play." lily looked at the buddy and said," wow, that's a good friend!

**Teacher-guided:** once upon a time, there was a curious boy named timmy. timmy loved to play with his toys and collect pretty flowers. one day, timmy found a shiny rock and wanted to poke it with his finger. but his mommy saw him and said," no, timmy. do n't poke it. it is not safe. that's a rock." timmy did n't know what to do. he thought it might be dangerous. he tried to grab the rock, but it was too big. he accidentally dropped it and broke into pieces. timmy was sad and surprised that he could n't poke the rock and felt bad again. from that day on, timmy learned to be careful and not poke things that be dangerous.


## 48  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 9 rewrites · forced ending)</span>

**Raw (no teacher):** once upon a time, there was a little girl named lily. she loved to play with her toys and pretend she was a princess. one day, she went to the zoo with her mama. while they were there, lily showed her mommy the animals to class." what are you doing, mommy?" asked lily." i am eating my favorite dinner." her mommy smiled and said," that's a good party, my darling." lily and her mommy shared their snacks and played with the animals. lily felt happy because she listened to her mommy made. after the while, lily got her favorite toy and smiled." play's great job, sweetie!

**Teacher-guided:** once upon a time, there was a little girl named lily. she loved to play with her toys and pretend she was a princess. one day, she had a nightmare about a big bear that destroyed her toy. lily was scared and started to cry. her mom heard the noise and came to see what happened." what happened, lily?" she asked." it's a big scary bear!" lily exclaimed." do n't worry," her mom replied." it's just a little bit. you can not get hurt." lily felt better and went back to playing with her toys.


## 49  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 9 rewrites · forced ending)</span>

**Raw (no teacher):** one day, timmy and his mommy thirsty. timmy's mommy asked him to buy the bottle for a toy car. timmy was excited to play with his toys. he rolled the bottle to the counter and asked his mommy if he could play with it. but the counter was too expensive and timmy did n't want to share. he wanted to play with his toy cars. his mommy said no and timmy was n't happy. later, timmy went to a fair man who paid for the real bottle. timmy was very happy to have his toy cars back and go home. he knew it would be good to share with his friends. he was happy to have a new friend named timmy. from that day on, timmy always shared his new toys with his friends.

**Teacher-guided:** once, there was a little boy named timmy. timmy loved to play with his toys and collect things. he had many toys, but his favorite was a little red ball. he would bounce it all day long. one day, timmy's little sister wanted to play with timmy's ball too. timmy did n't want to share his red toy and he was very sorry. just then, timmy had an idea. he asked his mom if they could play ball together, and his mom said yes. they played with the ball for a long time. timmy was very happy and hugged his mom. later that day, timmy and his mom went to the park to play. they played on the swings and had so much fun! timmy and his mom had a great day playing together.


## 50  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 9 rewrites · forced ending)</span>

**Raw (no teacher):** lily and tom like to play together. they have many toys, but their favorite is a big red ball. they would throw the ball to each other while they play. one day, they play with their ball and catch it. each other scored a lot. lily tried to push the ball, but it was too big for her. she started to cry. tom did not want to share. he saw lily struggling and took the ball. but lily was clumsy and threw her ball down the crowd. tom caught it and accidentally kicked it away. lily threw it at tom and said," give me back my ball!

**Teacher-guided:** once upon a time, there was a beautiful butterfly. he loved to fly around and play in the park. one day, he saw an incredible jogger! he wanted to play too, so he pointed at the clouds." hi!" he shouted. the butterfly said." no, i'm looking for a leaf. i'm looking for a new one." the butterfly said." i'm flying around and it's very beautiful." the butterfly smiled and said," it's a nice adventure. i'm glad i could play in the park.


## 51  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 7 rewrites · forced ending)</span>

**Raw (no teacher):** lila and ben are playing in the garden. they see another bee in the flowers. they want to touch the bee." look, ben, a bee!" lila says." it is too high and tough!"" no, lila, that is not a bee!" ben says. they run slowly to the garden. the bee is sad and angry." come on, let's go inside." they run to the kitchen.

**Teacher-guided:** once upon a time, there was a little girl named lily. she loved to play with her toys and wear pretty dresses. one day, she went to the park with her mom. when they went to the park, lily saw her mom's ball and wanted to play." can i play with your ball, please?" she asked. her mom said," sure, but be careful, it might break." lily played with the ball for a while, but then she accidentally dropped the ball. she was very sad and upset." what's wrong?" lily said," i'm sorry, mommy." her parents hugged her and said," it's okay, it's okay. it's just an accident.


## 52  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 8 rewrites · forced ending)</span>

**Raw (no teacher):** once upon a time, there was a little girl named lily. she had a toy guitar that she carried every day. one day, lily accidentally hurt her guitar with it. she felt very sad and did n't know what to do. lily's friend, sam, saw that she was bleeding and did n't want to play. lily's friend, sam, saw that lily was sad and asked what was wrong. sam told lily that she did n't feel sad because he wanted to play with his guitar too. lily's friend was very happy and said," do n't worry, i'll show you that my guitar looks better. it's a good idea." they went to a room and found a big big door to the ceiling. they were amazed at how much lily and said," thank you, sam! you are a great friend!

**Teacher-guided:** once upon a time, there was a little girl named lily. she had a toy guitar that she carried every day. one day, lily's friend asked her if she wanted to play with her. lily said yes and they started to play together. while they were playing, lily noticed that her toy was missing. she was sad because she could not find it. her friend said," let's find it together!" lily's friend looked and looked, but they could not find it. lily was sad, but her friend still still could n't find it. lily decided to search for it, but it was nowhere to be found. when they found it, they found it in a big tree. lily was happy to have found the toy. together, they found their toy.


## 53  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 9 rewrites · forced ending)</span>

**Raw (no teacher):** once upon a time, there was a little girl named lily. lily loved to dance and dance all day long. one day, she saw a shiny box on the ground. she got scared because it was very shiny and shiny. she asked her mom if they could try it. her mom said yes and they went to find a shiny key to help her. lily was happy to have an idea. on her way to her collection, the package started to move. it was very hard and fit in the box. lily tried it really hard but it was too heavy. she tried again and again, but she still could n't get it off. suddenly, she had an idea!

**Teacher-guided:** once upon a time, there was a little girl named lily. she loved to play with her toys and dream of fun. one day, while playing, she saw a box of ice cream on the table. she asked her mom," what's that?"" that's an expensive ornament, lily," said her mom." it's important to ask for permission first."" the next day, lily got a new treat and she was very excited to try it. she could n't wait to eat it, but it was too cold outside." i have a new toy for you," said her mom." but i know it's important to be patient. she takes care of things and care for herself." lily learned that it's okay to be patient and ask for permission before you make a mistake. she also told her mom that she was proud of her and hugged her tightly.


## 54  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 10 rewrites · forced ending)</span>

**Raw (no teacher):** tom and kim are friends. they like to play with toys and look at pictures of animals. one day, they see a big elephant on a leaf. the elephant is big and brown and has a long tail. the monkey wants to pet the elephant, but kim says no." it is not nice. he is too small and weak. he can not touch his tail. he might hurt us."" no, tim, it is not safe. you need to be careful. it.â€ sam says.

**Teacher-guided:** lily was a cat who liked to play with yarn. she had a big box of yarn in her room. she wanted to make a nice ball with yarn, many yarn and more. but her friend, tom, invited her to borrow his yarn. lily said," no, tom. your yarn is too thin and too long for me. you need to use it every day." tom did not want to use his yarn to make noises, so he said," no, lily, i want to have it! please!" lily was very angry and ran away. she was angrier and said," no, you ca n't touch my yarn! it is mine! i like my yarn!


## 55  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 6 rewrites · forced ending)</span>

**Raw (no teacher):** once upon a time, there was a little girl named lily. she loved to play basketball with her friends every day. they always played with their cars and have fun together. one day, lily's friend came over to play. lily saw a big dark room and wanted to play with it. she said," hi, i am lily. what are you doing?" lily said," my friend is lost!" lily said," what's wrong?" lily said," i feel scared and cold," her friend said," do n't be shy, i will help you find something bad." they searched all over the room, hiding in the room. lily was very happy and showed lily how to make a nice new friend.

**Teacher-guided:** once upon a time, there was a little girl named lily. she liked to play with her toys and explore the world around her. one day, she found a really smooth object in her room. she picked it up and showed it to her mommy." look mommy! a shiny object is so pretty!" she said." it's great, lily. it's a nice ornament that makes me happy."" yes, it's very pretty," lily said. they went to their room and started to play with the shiny object. then they laughed and finished their playing. when it was time for dinner, mom called out to the living room and said," lily, it's time to go inside and have some toast for dinner.


## 56  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 5 rewrites · forced ending)</span>

**Raw (no teacher):** once upon a time, there was a little girl named lily. she loved to explore and discover new things. one day, she found a shiny medal on the ground. she thought it was so pretty! lily picked the medal up and felt very happy. but she accidentally picked it up and decided to keep it home with her. lily got upset and missed her medal. her mom saw what happened and asked what happened. lily explained that she could n't test her medal. her mom told her that it's important to be careful to find the medal. lily learned she loved to play in the valley and remembered that she had many chances to look for it. she hoped that it would be nice to be the smarter and never stick her own.

**Teacher-guided:** once upon a time, there was a little girl named lily. she loved to explore and discover new things. one day, she found a shiny medal on the ground. she thought it was so pretty! lily picked the medal up and felt very happy. but then, she accidentally dropped the medal and it broke. lily was sad and did n't know what to do. her mom saw how sad lily was and asked what was wrong. lily said," i'm sorry, mommy. i did n't mean to break the medal." her mom hugged her and said," it's okay, lily. the medal was broken." lily felt better and said," great job, i did n't want to be so sad.


## 57  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 6 rewrites · forced ending)</span>

**Raw (no teacher):** once upon a time, there were two friends, sam and tom. they loved to play together all day long. one day, sam and tom decided to invite tom a birthday party. they shared the invitation of the party and gave tom a big smile. tom thought the party was very special. now, tom and tom wanted to celebrate with sam. tom opened the box and they had a big surprise! inside the party, they found lots of presents and music. tom and tom danced and laughed. they even laughed when they saw the pink party. tom's parents were very happy to see them and had a great time. at the party, tom and tom got to celebrate again.

**Teacher-guided:** once upon a time, there were two friends, sam and tom. they loved to play together all day long. one day, the sun started to set. as they were walking, they saw something new. it was a mysterious rock that had a hidden star. sam thought it was a special rock and asked tom," what is this?" tom said," that is a rock. it is so special. it can make friends." sam agreed and they both went on a wander. they saw many fun things, but they were n't sure what to do. the rock was so big and shiny. they stayed for a long time, exploring the world.


## 58  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 8 rewrites · forced ending)</span>

**Raw (no teacher):** the girl always looked for things to do with her. every day she would collect what she should find. she always looked for different things - like the ones. one day, the girl saw a butterfly that felt like a real butterfly. she wondered if she could use to catch it. she thought and thought until she had an idea. she kept squeezing the butterfly from a tree. she was so proud of herself for using it to keep it with herself. the little girl was proud of herself for helping her mom and she was glad that she could help the butterfly.

**Teacher-guided:** once upon a time, there was a little girl named lily. lily loved to play with her toys and eat yummy snacks. one day, she saw a beautiful butterfly flying above her. she wanted to see it and take it home with her. but her mom said," no, it's not ours. we're going to be careful." lily did not listen to her mom and put the butterfly in her bag. she opened the bag and took the butterfly out. but, the butterfly slipped. lily started to cry. her mom saw what was happening and came to see what happened. she took the butterfly away and helped lily get back to playing. lily was so happy to be safe, and she promised to always be careful when playing with her toys.


## 59  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 7 rewrites · forced ending)</span>

**Raw (no teacher):** once upon a time, there was a little bird by a small tree. the bird was very tired. it wanted to find a nest to rest. so, the bird flew down on a branch. with a big branch, the bird flew into the nest. the bird flew down, feeling so comfortable. suddenly, the bird saw a nest. the nest was very small and cozy. the bird said," i am happy i found this nest. can i go home?" the bird said," sure! i can help you, and you can have a big nest.

**Teacher-guided:** once upon a time, there was a little bird by a small tree. the bird loved to fly high in the sky. one day, the bird met a squirrel. the squirrel said," hello, bird! what are you doing?" the bird said," i'm looking for my best friend. i saw a tall tree with lots of leaves." the squirrel said," that tree looks very tall and strong. let's go look for your friends." the bird said," ok, i'll go help you." so, the bird looked around and found some pretty flowers. they also found some stones on the tree. they played while it was time for the bird to go home.


## 60  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 7 rewrites · forced ending)</span>

**Raw (no teacher):** billy was very silly and wanted to play. his mum won the prize and asked him why he was messing it up." you must n't use the challenge but i store first. it's also a mess," said billy." but i know you ca n't take it." billy was sad and ran away. billy started to cry." ouch! that hurt!" billy said. billy noticed that the direction." i did n't want something to play with you!

**Teacher-guided:** once upon a time, tom and sam were in the snow. tom was tired from playing with sam. he wanted to play with sam, so he pushed his sled down the hill. vroom, he fell along and hit his head with a big bump." ouch!" he cried. sam felt sad and wanted to help. he started to cry. sam's mom heard him and came to see what was wrong. she saw that sam was sad and started to cry." what happened?" she asked." we were grounded," said sam.


## 61  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 9 rewrites · forced ending)</span>

**Raw (no teacher):** once upon a time, there was a little girl named lily. she had a black cat named mittens. mittens liked to eat berries and would settle in a big bowl closed. lily cuddled with mittens and was never gone again. one day, lily was playing with mittens and mittens found a long egg stuck in the cupboard. mittens was lost and could n't find it. lily said," i need help you find my egg." mittens replied," i can help you." lily and mittens went to a place where the egg was safe. lily climbed up and grabbed on a rock. she felt happy and proud of max. she said," mittens, i did n't get hurt.

**Teacher-guided:** once upon a time, there was a little girl named lily. she had a black cat named mittens. mittens had a big, red ball that she loved to bounce. one day, lily and mittens went to the park to play. they played and had fun. after a while, they saw a big dog. the dog was barking and went very fast. mittens chased after the dog, but the dog was very fast. lily was scared and ran back home. she told her mom about the dog. her mom looked at her and said," no, no! the dog was so bad!" lily ran back home and tried to hug her mom.


## 62  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 8 rewrites · forced ending)</span>

**Raw (no teacher):** lily has a shield that she thinks when she pretends it is a superhero. she wants to show it to her friends and show her friends. she wants to show her shield to everyone and show it to her friends." i want to show you your shield!" she shouts. but her friend, lily, wanted to copy lily's stickers. she grabs photos from her pocket and roars it at her. but lily does not listen. she holds her belt tight and holds her hand. when she tries to grab her medal, she rip it and tv. she hurts her hand and falls off. the judges, lily, and her friends heard the loud five and turned off.

**Teacher-guided:** lily and tom were twins who liked to play hide and seek. they had a favorite game to do. sometimes they took turns to hide and seek, sometimes they hid behind trees. one day, lily and tom went to a new place. it was a big box with many colors on it. lily wanted to see what was inside. she asked tom," what can i play in the box?" tom shook his head and said," no, lily. this is my toy. it is pretty and shiny. do you want to keep my toy safe?" lily thought for a moment and said," no, tom. mine is mine.


## 63  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 10 rewrites · forced ending)</span>

**Raw (no teacher):** once upon a time, there was a little girl named lily. she loved to read books and read books. one day, she found a big box of junk on the table. she wanted to have it all. but the junk was too big for her. she tried to reach it, but she could n't. she asked her mom for help. her mom said," that's a useful object that can be strong. it's very thin to play with things. we can' get more heavy together, and then we can make anything if we do n't fit." lily was very sad. she did n't know what to do to do.

**Teacher-guided:** once upon a time, there was a little girl named lily. she loved to play outside and have fun. one day, she found a big, smooth top that she wanted to play with. she asked her mommy," what is this?" her mommy replied," it's a secret, lily. it's a secret place where you find it." lily was very excited and asked," what are you looking for?"" i'm looking for it," said lily." it's a secret place and i think it's treasure!"" let's go explore and explore." lily and her mommy went around the forest and saw many other surprises. lily happily said," that is very easy." at home, lily tried to sort the things into all her toys.


## 64  <span style="font-weight:normal;font-size:0.7em;color:#999">(11 sentences, 8 rewrites · natural ending)</span>

**Raw (no teacher):** tim and his dad went to the store. they saw many things to buy. they liked to choose what they were looking for. they checked the lid and put it in a drawer. they saw some flowers, some animals and some flowers. tim liked the animals and thought they were funny. he saw a big tree and a big tree. he thought they were funny and scared. he was scared of the tree. he tried to calm his cars away. he said to his dad," no, i will go away. they are dirty and strong.

**Teacher-guided:** once upon a time, there was a long little frog named fin. fin lived in a slippery pond with his friends. the frog liked to play and jump all day long. one day, fin and his friends were playing near a pond. they found a big, strong log. they all decided to play with it. fin and his friends played with the log. they had a lot of fun. when it was time to go home, fin went home, thanked his friends and they all gave him a big hug. the two friends were very tired from the fun, and fin wanted to rest. they said goodbye, and fin followed his friends the way back home.


## 65  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 7 rewrites · forced ending)</span>

**Raw (no teacher):** lila and leo were best friends. they always dreamed of playing with their dolls and their toys. they also liked to share their toys with their dolls and their toys. they had many room to make their dolls happy. one day, they decided to make a big tower in their room." let's write a story!" lila said. she picked up the same block from her book and put it under her pillow." no way!" leo said. he spun the block on a rock and landed on it." be careful with your blocks!

**Teacher-guided:** once upon a time, there was a little girl named lily. she loved to play in the sand and collect shells. one day, she came outside and saw a worm on the ground. she wanted to pick it, but her mom said she could not. lily thought that was mean and started to cry. her mom saw her crying and asked her what was wrong. lily told her about the worm and how she knew she wanted to pick it up. her mom gave her a piece of plastic and showed her how to put the worm in it. lily was happy and hugged her mom tightly." thank you for helping me, mommy." she said and gave lily a big hug." you're welcome, lily. i love you," her mom said.


## 66  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 9 rewrites · forced ending)</span>

**Raw (no teacher):** sara and tom. they are friends. they like to play with their toys. one day, mom asks them to clean up the mess. sara and tom are not happy. they want to clean up the mess." no, mom, we need to clean my room melting things. cleaning up the mess!" sara and tom say." yucky!" their mom shakes her head." no, it's too dirty!

**Teacher-guided:** once upon a time, there was a little girl named lily. she had a favorite ball that she loved to play with. one day, she saw a big box of toys in the living room. she thought it looks fun to play with them, so she decided to stop playing with her ball. lily went to her friend, sara. sara had a toy car that lily loved to play with. the toy car made a happy sound. she wanted to play with it too." can i play with your other toys?" lily asked." no, sweetie. we have to play with our toys," sara said." no, it's mine, i have one now.


## 67  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 9 rewrites · forced ending)</span>

**Raw (no teacher):** once upon a time, there was a wealthy girl called amy. amy loved to play with her toys every day. one day, she found a colorful folder in the shop. she was excited to try it on and try the folder. she put it on a table and went to the shop. she found a big tree with a stick on it. amy used her pencil to build a castle with the stick, but she could n't make too much noise in the shop. she used her pencil to build it and then she carried it down the counter. amy started to build again, and after a few minutes, she was done, she proudly picked up the folder. she was so happy to be able to help her new friends, and she waved it proudly proudly proudly.

**Teacher-guided:** once upon a time, there was a wealthy girl called amy. amy loved to play with her toys every day. one day, when she was playing, she saw a small box. she wanted to open it and touch it. she asked her mum if she could open it, her mum smiled and said yes. amy started to turn the box all by herself. she was happy and excited. she wanted to have fun. but then she had an idea. she took a deep breath and opened the box by the hidden glass. inside the box, amy found a beautiful blanket full of toys. she was so happy and content from her new blanket. amy was so happy and thanked her mum for the amazing new yes.


## 68  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 7 rewrites · forced ending)</span>

**Raw (no teacher):** once upon a time, there was a little girl named lily. she loved to play with her toys when it was time to go home, but she did n't like to share her toys with her toys. one day, her little brother got into the room and accidentally broke the toys in two pieces. lily was sad because she really wanted to play with them. her brother came over and saw how sorry he was and asked," what happened, lily?" her brother said," i and my toys are missing. you have to share your toys." lily did n't give up and said," i think i am very nice to you." her brother said sorry and said," i forgive you. see you now, it's time for me." lily was happy and they played together in the store. lily learned that it's okay to share and be kind.

**Teacher-guided:** once upon a time, there was a little girl named lily. she loved to play with her toys and make funny faces with the animals. one day, lily's mom asked her to help. at the store, lily saw a toy she really wanted. she asked her mom if she could buy it. her mom said," no, lily. it's not good to." lily was sad. she asked her mom if she could buy the toy. they said yes and they got the toy together. lily was so happy and hugged her mom. she thanked her and said," thank you, mommy!" she smiled and went to play with her toys.


## 69  <span style="font-weight:normal;font-size:0.7em;color:#999">(10 sentences, 8 rewrites · natural ending)</span>

**Raw (no teacher):** once upon a time, there was a boy named timmy. timmy loved to play outside, but he always wanted to remove trees from his trunk. his mom told him that it makes him strong and that his leaves were not theirs. she told him to be careful and not break the roots. timmy was very careful and kept poking up to his trunk. suddenly, he saw a big truck in the distance. the truck was very noisy and timmy knew he had to be careful when looking out for his way. so, timmy decided to ask his mom why he was trying to stop the truck and her mom said," it's a bully and wo n't let's clean it up and forth." timmy was very agreed to keep the truck dry and went inside to help his mom clean the fence.

**Teacher-guided:** once upon a time, there was a boy named timmy. he was just three years old, but his mommy had an idea. she asked him to take a picture of his toys. timmy did n't want to give the picture to his parents. he said no and just kept playing. then, a kind man came along and asked timmy what was wrong. timmy told the man again and he said he was sad. timmy was sad and nervous, but then he had an idea. he gave the picture to the man and he gave it to his parents. timmy was very proud of his work and went home feeling happy.


## 70  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 10 rewrites · forced ending)</span>

**Raw (no teacher):** dave was a gentle little boy. he loved to dance and dance around everything. he had a great time and soon he was dancing around too! everywhere he went people around the house wanted to clap the song to show. one day, dave set up to the music and started to feel dizzy. he wished for a big one and twisted until he stopped and stopped playing. he tried to cheer the music with all the music, but it was too high and he cheered the music and the music. dave was so happy that he danced around and danced. all his friends still sang until everyone clapped and cheered. dave was so happy and proud of him. from that day forward, dave's little dance was my best friend.

**Teacher-guided:** dave was a gentle little boy. he liked to play with his toy gun every day. one day, dave was playing with his toy gun when something strange happened. dave was scared. he asked his mom," what's that?" his mom smiled and said," it's a big truck! do not worry, dave. let's play!" dave and his mom played together for a few minutes. dave had a wonderful time. they had lots of fun together. dave was so excited he hugged his mom and said," let's play again soon, letâ€ ™ s go home and have some fun." his mom hugged and said,' ok, let's go!


## 71  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 6 rewrites · forced ending)</span>

**Raw (no teacher):** the bear was three years old. he was so excited he could n't help but smile. one day, he asked the old man if he wanted to play with his toys. the old man said yes and started to play with the toy. after a while, the little bear's mom asked him to take the toy back home. the little bear was so happy and said okay! the old man went back to his nest and showed the toy to his friends. they all played together and had lots of fun. the bear was so happy that he had his new toy to play with.

**Teacher-guided:** once upon a time, there was a little girl named lily. she loved to play with her toys and eat yummy food. one day, she went for a walk in the park and saw a well. she wanted to climb it and see what was wrong. suddenly, lily heard a loud noise. she went to investigate. she saw a little boy named tim. tim was holding his mask and laughed." look, lily! i want to lift this mask!" said tim." no, tim! let me help you use it to lift things!


## 72  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 10 rewrites · forced ending)</span>

**Raw (no teacher):** anna likes to write with her crayons. she can not wait for this food to eat. she tries to write in a new backpack, but she can not find it. she looks at the calendar when she is not happy. she feels sad. she wants the calendar to help her mom. she looks at the picture and sees a picture of a yellow bee. she wants to pretend she is flying in her room. she runs to the door and hugs the pot. she tells her mom," the crayon is very hot. the crayon is here. i have no tape to make it dry.

**Teacher-guided:** once there was a kid named joe. joe wanted to do something special. one day, joe wanted to try something special. he decided to go outside and jog. he thought it would be fun to jog with all the other kids. joe ran around and explored. he saw all sorts of different sights and shapes and sizes. but soon he started to feel sad. he felt so sad because he could not run too far. then, he saw a little boy walking by." hi joe!" said the little boy." i'm not so sad anymore.


## 73  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 7 rewrites · forced ending)</span>

**Raw (no teacher):** once upon a time, there was a boy named timmy. timmy loved going to was a big office with his mom. one day, timmy went to the post office and wanted to open it. he tried to find a key but it was too heavy. he asked his mom to help him open the office. his mom gave him a present and he smiled. timmy was so happy to help fix the office. he was happy to be there to play outside when it broke. after that, timmy went back to his room and did n't want to play on the fun. his mom was very proud of him for helping her.

**Teacher-guided:** once upon a time, there was a boy named timmy. timmy loved to play in the garden with his friends. one day, timmy said," let's go to the park. it's a fun day." but then, a big dog came to the park. the dog looked angry. timmy did n't want to leave the park. timmy shouted," i want to play in the park!" the dog did n't listen. timmy thought about it for a moment. then, he had an idea. he had an idea. he said," let's play on the swings!


## 74  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 9 rewrites · forced ending)</span>

**Raw (no teacher):** once upon a time, there was a boy named timmy. timmy loved to play with his toys in his room. they would roll around and find shelter. timmy loved to play with his toys and make noises. one day, timmy's mom came into his room and saw that timmy's room was very tidy. timmy thought that was very old and asked his mom," can we lend the toys to their room?" his mom smiled and said," sure, timmy. let's complete this puzzle trip together." so, they set up into their room and had a lot of fun. when they was done, timmy's mom said," wow, that's great! we had a wonderful time playing in the tub. do you want some cookies for a few minutes?

**Teacher-guided:** once upon a time, there was a boy named timmy. timmy loved to play with his toys in his room. one day, he decided to organize his toys. timmy got upset and started sorting all the toys. while he was sorting, timmy accidentally knocked down a pile of toys and said," no, it's too messy!" his mom heard him and came to the room." i'm sorry, timmy," she said." oh no, timmy! i ca n't organize my toys. i thought it was very tough." timmy was sad and said," i'm sorry, but i ca n't organize my toys anymore." his mom finished organizing and said," it's okay, timmy. i'm glad that you helped.


## 75  <span style="font-weight:normal;font-size:0.7em;color:#999">(12 sentences, 7 rewrites · natural ending)</span>

**Raw (no teacher):** once upon a time, there was a pink elderly turtle. the turtle was very hungry and wanted some food for dinner. so, the turtle asked the turtle," what i need for food?" the turtle replied," i want milk! i need it to be very hungry." the turtle said," i have the pepper to eat it if you want with me." the turtle did n't know what to do. he swam to the cashier and said," i need to eat this bitter thing. i love it so i can find a way to make it better." the turtle was so happy and thanked the turtle for his help. the turtle then took the fake pill and said to the turtle," this one is very special, and now it's time for dinner." the turtle was shocked but still liked the taste of the delicious food and smiled.

**Teacher-guided:** once upon a time, there was a pink elderly turtle. the turtle was very hungry and wanted some food for dinner. so, he decided to try the food first. he hopped around the river, looking for food. he started to feel very tired. suddenly, the turtle saw something shiny in the water. he looked closer and saw a shiny piece. he thought it was a long thing! he took the piece and admired it. the turtle was very happy and he ran back home. he learned that playing with things can be fun. he knew that he had learned something special and he would always remember to keep it safe.


## 76  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 10 rewrites · forced ending)</span>

**Raw (no teacher):** mia and ben were hungry. they wanted to eat lunch. they asked their mom to buy lunch. mom said," no, please, we have to hold first. the picnic is very messy. mom will be busy and cold with the food." they took the sandwiches and bread to the kitchen. mom said," fine, but now it is very hot and cold. mom will have a yummy sandwich. do n't, kids. we have to make a spicy cake to eat." the yummy food made mom tasty.

**Teacher-guided:** lily loved to play dress up in her room. she had lots of fun but her favorite was a small doll. lily liked to play with her doll every day. one day, lily's mommy gave her a new gift. it was a pretty dress with a bow on it. lily loved her new dress and asked her mommy to come to her room. her mommy said yes and gave her a big smile. lily felt happy and danced around her room. after a while, lily's little brother came over to her room and said," lily, your dress is pretty! i like it very much." lily felt happy to see her brother and felt a little sad because she did n't want to play with his big doll. but her toy was still hers. lily did n't understand why his brother did n't know, so she said," i do n't want your doll.


## 77  <span style="font-weight:normal;font-size:0.7em;color:#999">(11 sentences, 8 rewrites · natural ending)</span>

**Raw (no teacher):** anna and ben are friends. they like to play in the park. one day, they see a big tree. the tree has many leaves." look, ben, a squirrel!" anna says to ben." let's go for the squirrel!"" ok, ben, but be careful!" ben says. they run to the tree. they do not find one. they do not see ben on the tree.

**Teacher-guided:** once upon a time, there was a little girl named lily. she loved to play in her backyard. one day, she found a beautiful crystal on the ground. she picked it up and showed it to her mom." wow, that's pretty pretty!" her mom said." i found a crystal!" lily was very happy to see the crystal. she kept playing with it all day. she was very happy and continued to play with the crystal. and she realized she had made a new discovery in her backyard.


## 78  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 7 rewrites · forced ending)</span>

**Raw (no teacher):** anna and ben are twins. they like to play with their toys in their room. they have many toys, but mom is not happy. she has a new toy to play with. one day, they have to go to the store to buy some milk for them. mom says they have to wait a bit longer. she says they have to go to the store and look up at the milk on the shelf. they see some bottles and some towels. they open them and ask mom nicely to buy some. mom says they have to go to the store. sara and ben are excited. they say it is time to get home.

**Teacher-guided:** once upon a time, there was a little girl named lily. she loved to play with her toys and go to the store to buy some new toys. one day, she was playing with her toys when she found a shiny pin on the floor. she picked it up and showed her mom. lily's mom brought it to her and said," lily, this pin is pretty! can i buy it for later?" lily said," okay, but do n't forget to be careful. your mommy will think it is interesting." so, lily got to look at the pin again. she was very careful when she managed to give it to her mom. finally, mommy said," thank you, lily! now, let's go home and have some fun!" and so, lily and her mom went home and lay down at their beds.


## 79  <span style="font-weight:normal;font-size:0.7em;color:#999">(10 sentences, 6 rewrites · natural ending)</span>

**Raw (no teacher):** one day, tom and sue went to the park with their mom. they invited mom to perform a special game. mom set the red ball into many colors. tom and sue blew the red ball to the ball. they worked very hard. but after a while, they got tired. tim asked sue to try again. she held the red ball and smiled. they liked how they could play and pull the ball. at last, they climbed up to the ball. they looked at mom and said she smiled and said she was good at work. sue felt proud.

**Teacher-guided:** one day, tom and sue went to the park with their mom. they invited mom to perform a special game. at the park, there was a big park with many people there. tom and sue sat down on a bench and watched the statue together. on the other side, they met a friendly dog named max. max liked to play with the red ball too. tom and sue spent a long time together. they played and had a great time. tom was not grumpy anymore. they played together all day.


## 80  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 7 rewrites · forced ending)</span>

**Raw (no teacher):** once upon a time, there was a little girl named lily. she loved playing with her hoop and taking pretending to be squares. one day, she saw a big lion hiding in the park. it was very big and scary, and lily was scared. she wanted to get back to the zoo. she asked her friend, the lion," what is this?" the giraffe asked," it's a big, strong lion. we need your whistle and follow the other animals in the jungle, and give them far away." lily thought for a moment and then agreed to follow the giraffe. after a while, they arrived at the zoo. lily was so happy to have such a great time! she ran home and told her mom all about the big, black lion who had vanished.

**Teacher-guided:** once upon a time, there was a little girl named lily. she wanted to play with her toys for breakfast. but her mommy said no! lily got unhappy and tried to play with her toys. one day, her mommy was helping her with her toy in her room. lily was upset and cried out loud. her mommy came running and saw that lily was upset. she told her everything was okay and her mommy hugged her. they kissed her inside and made her feel better. after her nap, lily went outside to play with her toys. she saw some flowers and thought it was cool to play. she also wanted to play with them again. she knew now they would make her feel better.


## 81  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 9 rewrites · forced ending)</span>

**Raw (no teacher):** lily liked to play in the park with her ball. she ran to the slide, the ball and the ball. she wanted to go faster and faster." look, mommy, i can go first!" she said." ok, lily. but only if you play with your ball. it is a very old ball." lily nodded and started to run to the park. she ran to the park who was very fast. it was very fast and fast. she did not see a bird in a pond.

**Teacher-guided:** once upon a time, there was a little girl named lily. she loved to play outside in the garden. one day, she saw a big leak in the ground. she asked her mom what it was and said," that's a leak." her mom said," i'm going to get some help repair." lily was happy to help and they went to the garage. they worked together to fix the leak and they fixed the leak. after a few minutes, the leak was better and lily and her mom asked," what did you do, lily?" her mom said," you wanted to help me." lily felt a little better and said," yes, i did." her mom said," me too. now, let's go home." and they went back home and lily went back inside, feeling happy to be back on her way.


## 82  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 5 rewrites · forced ending)</span>

**Raw (no teacher):** sam and sam were playing in the park with their ball. they liked to kick the ball to each other and catch the ball. they had fun and made silly noises. but then, sam saw a big dog. the dog was barking and running towards them. sam shouted," no, no! it is mine! i saw it first!" sam yelled," give me back my ball!" sam was scared and ran away. he chased sam. sam ran and ran to him.

**Teacher-guided:** once upon a time, there was a little boy named timmy. timmy loved to play with his toy cars and trucks. he would bring them with his friends and go outside to play. timmy would run around all day, but then he tripped on a rock and fell to the ground. his friend johnny saw him crying and asked," why are you sad?"" i lost my toy," timmy said." timmy did n't know what to do. i found it over there for you." johnny wanted to help him." i can help you find it," he said." maybe it's lying on the ground." so, timmy and johnny went to the park and found something shiny. timmy felt happy and proud.


## 83  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 6 rewrites · forced ending)</span>

**Raw (no teacher):** once upon a time, there was a little bunny named bunny. benny loved to eat carrots and eat carrots every day. one day, benny's friend billy came over to play. billy asked benny what was wrong, and benny said," i hate you." billy saw benny's problem and said," i like to have some carrots." benny felt bad for billy and said," i know, i'm sorry, but i should n't eat you every day." benny learned his lesson and was n't listening to his friend. from that day on, benny always made sure to make sure to put something new on his ground and never ate again.

**Teacher-guided:** once upon a time, there was a little bunny named bunny. bunny loved to hop and play with his friends all day long. one day, he saw a big red ball in his box, and he wanted to play with it. bunny hopped over to the ball, but it was very quick. he hopped over to the ball and thought it was very nice to play with it. so, the bunny played with the ball all day for a long time. but then, the ball started to get stuck in a tree. bunny was sad, but he wished he had never gone to the tree. then, a big wind came and caught the ball. bunny tried to help, but it was too high. the little bunny was sad, and they could n't reach the big tree. they tried to reach the top, but it was too hard. they could not reach the big tree.


## 84  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 8 rewrites · forced ending)</span>

**Raw (no teacher):** sam and jen are friends. they like to play with board. they have fun together. one day, they see a big dog. the dog is brown and black. he is black and brown." hi, cat," sam says. he wants to play with the board." can i play with your board?" jen asks. the cat does not like it. she says," no, no!

**Teacher-guided:** once upon a time there was a little girl named lily. she loved to play outside in her garden. one day, she saw a flag on the ground. she asked her mom," what is that?" her mom replied," it is a flag. can we decorate it?" lily thought for a moment and said," okay, let's make a flag!" her mom helped her decorate the flag together. lily liked how the flag was so beautiful and pretty! after a while, lily's mom asked her if she could have a walk in the park. lily was so excited to add a picture onto the flag and carried it around her backyard. she saw the blue flag and smiled. she looked so happy!


## 85  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 8 rewrites · forced ending)</span>

**Raw (no teacher):** sara and ben like to play with blocks together. they build towers and tunnels for towers and animals. sara is very happy. she says," wow, ben, the blocks are fun! let's make some houses and bridges and have fun!" ben says," ok, ok, i will be more careful. and so, let's make a team!" he has a red wheel and some squares. sara says," ok, ben. i will try. and we can build a hill and make the hill. then we can make a low inch tower with the same and two square.

**Teacher-guided:** once upon a time there were two friends. they played together and had a fun day. they spun around and around. they laughed and laughed until they were tired. but then, one day the two friends had an idea. they ran to their house. the next day, when they arrived back, they were so excited. they were amazed. the first one smiled. when they arrived back, the two friends were amazed. they had a big smile on their faces. the two friends spent their rest of the day exploring the garden together. it was a special day, and the two friends played together until it was time to go home.


## 86  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 9 rewrites · forced ending)</span>

**Raw (no teacher):** once upon a time, there was a little girl named lily. she had a toy wound that she put on the toy floor. the cloth was big and shiny. lily was happy to draw next to her. she took the scissors from her mom, but when she was wrong, she accidentally broke the cloth. lily was sad because her favorite toy was torn. her mom hugged her and said," it's okay, lily. it's broken." lily said," i'm sorry, lily." her mom hugged her, and they played together together, enjoying the sunshine and helping each other. she was happy to see her mom upset.

**Teacher-guided:** once upon a time, there was a little girl named lily. she loved to play with her toys and her teddy bear every morning. one day, lily's mom asked her to help with the dishwasher. lily was curious and wanted to help her mom with the dishwasher. but when she got to the dishwasher, it was very difficult. lily's mom said," lily, the dishwasher is too heavy for you." lily felt sad and knew she had to help. so, she asked her mom to help. her mom said," but i need to be careful. i need to fix the dishwasher." lily was very happy to help and they worked together to repair it. days passed and lily felt proud of her mom. lily felt proud and proud of her work and helped her mom make it clean.


## 87  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 8 rewrites · forced ending)</span>

**Raw (no teacher):** once upon a time, there was a little red bird. the bird loved to sing and learn new words to be happy. one day, the little bird was singing a song to get on a light. he sang his song to help the bird with a big smile. the little bird sang to the bird. the bird felt so happy that he climbed up a tree with a big smile. the bird felt like he was flying too! after a while, the little bird saw a butterfly flying high in the sky. the butterfly had escaped from dead! the bird was so happy that it flew right into the sky and saw all their friends. they were amazed by the pretty colors and the little bird. the little bird was so happy that the bird was so brave and kept singing.

**Teacher-guided:** once upon a time, there was a little red bird. the bird loved to sing and learn new words to be happy. one day, the bird found a shiny pink ball. it was very pretty and colorful. the bird flew very gently and started to sing. the bird heard a loud voice." look, little yellow bird. i found a shiny ball!" said the bird." that is amazing, the bird. let's practice together!" so, the bird got to practice. the bird practiced every day and soon they became good friends.


## 88  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 7 rewrites · forced ending)</span>

**Raw (no teacher):** lily and tom are twins. they like to play with their toys in their room. one day, they see a big box of toys. it has many toys and toys. mom says it is okay. they can not play with the toys." this is a good crib. it can make noises and move. do you want to hug it?" lily says. mom shakes her head. she goes to the table.

**Teacher-guided:** once upon a time, there was a little girl named lily. she had a big blue ball that she loved to roll around. one day, lily's friend named billy came over to play." hi lily," said billy." do you want to play with me?" lily smiled and replied," yes, i like to roll too! can i roll faster?"" of course, lily! you can!" said billy." okay, billy! let's go play together!" they played all day on the swings and had a great time.


## 89  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 8 rewrites · forced ending)</span>

**Raw (no teacher):** once upon a time, there was a little boat. the boat lived in the water. one day, the boat went to the river and got some water. the boat was scared, but then started to paddle away. the boat felt brave and stopped. on the other boat tried to let go of the boat, but it did n't move up. the boat kept walking, trying and finally she reached the end of the river. the boat was so happy and thankful, the fish gave the boat a big thank you. the boat thanked the big fish for being so patient and helped the boat to stay. the boat smiled and said," you are the best!" and so, the boat continued to ride into the sea, always feeling alert and happy to be safe.

**Teacher-guided:** once upon a time, there was a little boat. the boat lived in the water. one day, the boat went to the river and got some water. the boat liked the water very much. suddenly, the boat heard a loud noise. it turned and saw the water was coming from a big boat. the boat was very small and did not know what to do. the kayak felt sad. then it saw some fish in the water. the fish was sitting on a big rock. they wanted to make the boat happy. the boat said," let's play! they take turns and float around the river.


## 90  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 8 rewrites · forced ending)</span>

**Raw (no teacher):** once upon a time, there were two friends named jack. jack was a big and white bunny. jack loved to play together every day. one day, jack went to the park with his friend. while they were playing, jack told jack," my ball is fake! i can not sell it my mommy!" jack was a good boy and knew he had to replace his toy for himself. jack gave jack his ball and said," no, i'll supply it find somewhere to play with it." jack did n't give up and said," no, i need to keep it! i need to keep your tidy home very neat and tidy." jack was sad, but he was a good boy. the boy said," that's right, jack.

**Teacher-guided:** lila and tom are friends. they like to play together. one day, they see a big hill. they want to climb it and climb it." let's go, lila!" tom says." ok, tom. but be careful. the hill is very dangerous and steep."" ok, tom," lila says." but you have to be careful. the hill is very hard. you might fall and break it.


## 91  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 7 rewrites · forced ending)</span>

**Raw (no teacher):** a little girl named lily. she loved to play with her toys and run around it. one day, she went to her room and saw a ghost. the ghost looked very bad. she did not like the ghost and felt sad. lily's mom had told her to be careless and not let her clean up the ghost. lily did not want to play with the ghost, but she just wanted to play with the ghost. her mom started to feel better at the ghost and promised to play with her. they played tag and had lots of fun. lily's friend was happy again. lily learned from that teasing is important and that it's important to be careful with her dolls. from that day on, lily loved to play hide and seek with her friends.

**Teacher-guided:** once upon a time, there was a little girl named lily. she loved to play dress up in the meadow. one day, she found a new cup on the ground. she jumped and twirled around, feeling peaceful and happy. she played around until it became dark outside. after a while, she went back inside to show her mom." look, mom! a new cup i found!" she exclaimed. her mom smiled and said," let's dry it off." they got to the bathroom and put out a blanket. it looked so comfy! after they finished, lily and her mom sat in the bedroom, feeling very sleepy.


## 92  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 6 rewrites · forced ending)</span>

**Raw (no teacher):** lily and tom were playing with their toys in the garden. they liked to pretend they were spies." look, tom, i found a big pile of blocks!" lily said, holding up her block and making it disappear." wow, that's fun!"" tom said, following her." you have a lot of boxes. they are very cool." but then, lily saw tom's tower. she wanted to play with it. she tried to fight harder, but tom could not. he pushed her and pushed her away.

**Teacher-guided:** once upon a time, there was a little girl named lily. she loved to play outside with her toys. one day, lily went to the park with her mom. she saw a red ball and wanted to play with it. she picked it up and took it away. suddenly, a boy came to her and saw her playing. he said," hi lily! can i play with you?" lily said," yes, of course! let's play together!" they played in the park and had fun. when it was time to go home, lily said goodbye to her new friend. she went home and told her mom about her fun day.


## 93  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 6 rewrites · forced ending)</span>

**Raw (no teacher):** once upon a time, there was a little young girl named lily. she loved to play with her toys all day long. one day, she found a big box on the ground. she was curious and picked it up." mommy, look me a new pin!" she said. later that day, lily's friend came over to play. he saw lily's telephone and wanted to play with her toy. lily asked," what's that?" her friend replied," it's my favorite toy. put it in the air and it makes a big mess." lily said," my toy is big.

**Teacher-guided:** once upon a time, there was a little young girl named lily. she loved to play with her toys all day long. one day, she found a big box on the ground. she was curious and picked it up. she opened it up and found a little mouse. the mouse was scared and sad. lily knew she had to be careful. she picked up the mouse and hugged it. after a while, lily's mom came home. she saw the mouse and wanted to help. she asked lily to help. lily held the mouse tight and gently tried to help the mouse. finally, the mouse was able to catch away and lily was happy too.


## 94  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 7 rewrites · forced ending)</span>

**Raw (no teacher):** ben and lily are twins. they like to play with their toys in their room. they have many toys and books. they have a lot of fun. but mom said they have to clean up the mess and clean up the toys." no, we have to clean up after we work." ben and lily say. they start to clean up, but they do not stop. they get in the car and make a big mess. lily and ben stop cleaning and cry." we do n't have enough jam to clean up. we can try too.

**Teacher-guided:** once upon a time, there was a little girl named lily. she loved to play with her toys and go outside to play with her friends. one day, she went to the park with her friends. she saw a big red ball. she wanted to play with the ball. but her friend, max, wanted to play with the ball too. lily said," we can play together. let's play ball together!" max agreed and they played with the ball together. as they played, max said," i have an idea. let's share the ball!" lily said," ok!" they both put the ball down together.


## 95  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 6 rewrites · forced ending)</span>

**Raw (no teacher):** tom loved to play with his toys and his crayons. he liked to make stories with his crayons, his crayons and his crayons. he liked to make cars with the crayons and make houses and houses with his crayons." look, tom, i made a whole room. i made a big, calm room with some crayons!" he said to his mom, meowing. suddenly, it glowed." oh, tom, a sunflower!" his mom said, pointing at the sunflower. it was glowing and had pretty petals." wow, tom, it's so pretty! can i keep it?

**Teacher-guided:** once upon a time, there was a princess. she was very happy and enjoyed playing with her toys. one day, she went to the forest to find a new place to play. when it was raining, she gathered her toys and started to play. the princess started to play, but soon the mud was too big for her to carry. the princess had never seen anything like it before, but it was hard for her to carry. she kept insisting to be careful and did n't go too far away. suddenly, something amazing happened. the princess began to panic. she tried to run but she slipped, and she fell down. she fell and hurt herself. she started to cry for help, but nobody was there. the princess rushed over and hugged her tightly.


## 96  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 10 rewrites · forced ending)</span>

**Raw (no teacher):** timmy and sam were playing together in the park. timmy saw a big, tall mill. tim said," let's play in the woods and be very careful, tim!"

**Teacher-guided:** lila and sam were friends who liked to play in the park. one day, they found a new cane in the park. she thought it was a cane." look, sam, this cane is big. i found it from the other side of the park. i think it might be fun to play with it," lila said." yes, it is. it will be fun," sam said. he had an idea." let's go. we can play games and have fun!" sam agreed. they ran to the slide, up and down.


## 97  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 9 rewrites · forced ending)</span>

**Raw (no teacher):** sara and tom are friends. they like to play together in the park. one day, they see a big curtain. they want to touch it." let's go and touch the curtain," sara says." ok, but be careful. it might be sharp or sharp. we might touch it." tom says. they take the curtain and run to the curtain. they look at it and wonder what it does. but the curtain is not tall and scary.

**Teacher-guided:** once upon a time, in a cheerful little village, there lived a boy named tim. tim had a big box of toys in the garden. he liked to play with his toys all day long. one day, tim's mom said," tim, you should clean your toys." tim did not listen to his mom and did not want to do it. so he took his toys away from mommy and hid them in a big pile of junk. tim was happy. he could not wait to play with his toys and play with his toys. but then, something happened. tim's mom was sad. she said," tim, i do n't want to stop crying. i want to play with my toys first!" tim felt bad and said sorry.


## 98  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 5 rewrites · forced ending)</span>

**Raw (no teacher):** once upon a time there was a little girl named lily. she loved to play with toys and eat yummy candy. one day, she went to the store with her mom. she saw a ball and thought it was too expensive. lily asked her mom if she could play with it. her mom said," no, lily. you need to buy it first." lily was sad but she knew she had to give up her toys. she went to the store and asked her mom if she could borrow the toys. her mom said yes and gave her a big hug. lily learned that sometimes things do n't belong to us.

**Teacher-guided:** once upon a time there was a little girl named lily. she loved to play with toys and eat yummy candy. one day, she went to the store with her mom. she saw a ball and thought it was too expensive. lily asked her mom if she could play with it. her mom said," no, lily. you need to buy it first." lily was sad but her mom told her that she could n't play with the ball later. so, lily went to her room and started to put on her shoes. she thought it was cool! later that day, lily's mom asked her if she could have some juice. lily thought it was so good! she did n't realize she would get a juice from her store, so she gave her a big cup of juice.


## 99  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 7 rewrites · forced ending)</span>

**Raw (no teacher):** once upon a time, there was a little boy named timmy. timmy had a toy car that he loved to play with. one day, timmy's mom told him to go to school and start to play. timmy was a good idea and he wanted to teach his toy car. he recommended his new toy car to his friend. his friend was very happy and asked for a lot of work. timmy was so happy and agreed to share his toy car. but when timmy got to school, he accidentally broke his toy car in a problem. his car was broken and could n't fix it. timmy was sad because he loved his new toy car so much. his mom helped him fix it, and timmy helped fix it. he soon fixed his car and could complete again.

**Teacher-guided:** once upon a time, there was a little boy named timmy. timmy had a toy car that he loved to play with. one day, timmy's mom came into his room and asked him what was wrong." i do n't know," said timmy." it's okay, timmy. i'm sorry i still hurt my car."" do n't worry, timmy. i'll help you find another car that would help you feel better." he said. when they got home, timmy's toy car looked shiny and shiny." wow, it's amazing!" said timmy." it's a special toy!


## 100  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 6 rewrites · forced ending)</span>

**Raw (no teacher):** ben and mia are twins. they like to play with toys and their toys in their room. they have one doll, dolls, and blocks. but ben is learning how to use a block at a time. he points to a switch on top." ben, it is a great print!" mia says. she writes the quiz on the bridge. she writes on it," this job is very fancy now!"" wow, i'm a great painter," ben says." i'll number blocks."" do you know how to weigh 20 ostriches?

**Teacher-guided:** once upon a time, there was a little girl named lily. she had a long dress that she loved very much. one day, lily went outside to play. she saw a beautiful flower that looked very pretty. lily wanted to touch it, but her mommy said no. she felt sad. later that day, she saw a big tree. she wanted to climb this tree. she went over to the tree and saw a berry bush. she tried to reach the berry. but it was too high for her. she could not reach it. lily started to cry.


## 101  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 7 rewrites · forced ending)</span>

**Raw (no teacher):** lily was busy and she wanted to read an book with her mom. she put her uniform on a big book and asked her mom to read it for her. but her mom said no because she was sick. lily did not believe her mom was smart and just liked to read the book before she opened the book. she whispered to her mom," mommy, the book is very soft and sweet." her mom listened and then gave her a hug. lily stopped crying. she fell asleep, still dreaming about the book she had read. her mom was very happy and proud of her for being so smart and taking care of her.

**Teacher-guided:** once upon a time, there was a little girl named lily. she loved to play with her toys and pretend she was a fast pirate. one day, lily's mom asked her to pack a special treasure. lily was so happy to help and helped her put the treasure in her toy box. lily was very excited! but then, it got too hot and she decided to play outside. she ran around and jumped, down and down. after a while, she got bored, but then she accidentally dropped her toys. lily got very dirty and wanted to take her toys away. but it was not safe, but she realized that the treasure was now a broken box. she had to put away her toys and put them in her special box. later that day, lily's little brother came into play with his toys. lily was very happy and proud of herself.


## 102  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 7 rewrites · forced ending)</span>

**Raw (no teacher):** once upon a time, there was a little duck named fin. fin loved to swim in the pond near his best friend, sam. they always swam or jumped into the water. one day, fin saw a big jug near the pond. the jug was sad because tim and sam wanted to play with the jug. so, fin swam over to the jug and started to play. but the jug was very far from the water. fin was very sad and ran away. they could not swim anymore. the next day, carl went back to his house and got lost. he looked everywhere and could n't find the jug. fin's friend, sam, came over and saw the head.

**Teacher-guided:** once upon a time, there was a little duck named fin. fin loved to swim in the pond near his best friend, sam. they always swam or jumped into the water. one day, fin saw a big jug near the pond. he thought it would be fun to play with the jug. fin wanted to play with the jug. but sam saw the big jug on the water. splash, fin and sam could not wait to get the jug to play. fin swam very fast in the water. they both swam and laughed. fin was happy again. from that day on, fin and sam were the best of friends. together, fin and sam knew they could have fun playing in the pond together.


## 103  <span style="font-weight:normal;font-size:0.7em;color:#999">(9 sentences, 5 rewrites · natural ending)</span>

**Raw (no teacher):** james and jen were playing in the bathtub. they made a big tower of steam soup and some water. they made a big splash of water and a lot of noise. they were having so much fun that they did n't splash the water on their skin. they heard a loud noise ignore them. they turned around and saw a big hole in the sink. they were scared and jumped on the floor. they ran to their mom and hugged her." it's okay, mom!" they said." but we need to stay inside for a while."" i promise i know you did.

**Teacher-guided:** once upon a time, there was a little girl named lily. she loved to play outside in the sunshine. one day, she found a beautiful leaf in her backyard where she wanted to grab it. but her mommy always told her that it was n't safe. lily did n't want to give the leaf to her mommy, so she put the leaf in her pocket to keep it safe. after a while, lily's mommy was very busy and told her to be careful not to lose it. lily carefully picked the leaf and put it in her pocket. she walked back inside to find her mommy watching her. they were very happy and they played together all day long.


## 104  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 8 rewrites · forced ending)</span>

**Raw (no teacher):** once upon a time, there was a little girl named lily. she loved to play outside and explore. one day, she decided to polish her toe very carefully so her mom and dad took her to the park. lily saw a big blue microphone and wanted to hold it. but her mom said no because it was too sticky for her. later that day, lily's mom came into the park. she told lily that she took her hand and said she wanted to keep it. lily was so happy to be able to help her mom and dad. they quickly pulled the microphone to the surface. lily felt proud and loved to help the microphone. she knew that if she put it in a safe place where she stayed. after a while, lily looked at the microphone and saw that the open was just the right thing she had done.

**Teacher-guided:** once upon a time, there was a little girl named lily. she loved to play outside and explore. one day, she went outside to play with her friends. they had a great day at the park, and lily felt happy. they went to the park and played on the swings. soon, something happened. lily got upset and said," my mommy is sad." her mom hugged her and said," it's okay, sweetie. i'll help you feel better." after they finished playing, they went back home. lily's mom made sure they could feel better. they played on the swings and had lots of fun together. lily felt happy to have learned that it's important to have fun too.


## 105  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 5 rewrites · forced ending)</span>

**Raw (no teacher):** once upon a time, there was a little girl named lily. she loved to play outside all day long. one day, she found a strange flower that she could never find it. the flower might turn and move. lily wanted to open the flower, but it was too big. lily tried to push it but it missed. she pushed and but it was too big. lily's friend, billy, came over. it helpless and accidentally dropped the flower. lily tried to help, but billy was too strong. later that day, lily and timmy found that the flower was very dirty. lily was sad and could n't eat it anymore.

**Teacher-guided:** once upon a time, there was a little girl named lily. she loved to play outside all day long. she would skip around the garden and explore the world around her. one morning, she saw a special triangle on the ground. she wanted to keep it forever and was so happy. she ran to the triangle and touched it. the mighty triangle became a star. she was so happy and applauded her special ability to keep it safe. later that day, her friend sally came over to play. sally was so excited and asked if she could keep it forever. sally was very pleased and hugged her friend. sally smiled and said yes! she was so happy for sally to take her home with her.


## 106  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 10 rewrites · forced ending)</span>

**Raw (no teacher):** tim and sue liked to play soccer on the swings. they had a lot of fun and not easy. tim was very good at it. he did not like to break his aeroplane. tim said," it is not easy to play the ball." they played soccer all day long. after a big, tim's little sister, came into the room. tim wanted to play too. he used his red ball to push it. tim threw his red ball and this made a loud noise. sue saw the broken ball. she said," tim, this is the same ball.

**Teacher-guided:** once upon a time, there was a beautiful little fish named nemo. nemo loved to swim all day and play. one day, nemo was swimming in the water and saw that it was dirty. nemo asked his friend," what's that soap?" he replied," the soap is not dirty. it is dirty. let me help you clean it." nemo and his friend played in the water. they had so much fun playing together. the water was big and salty. nemo and his friend had a great time. they became friends and played together in the water. to the end of the day, nemo was very happy to help his friend and swam nicely.


## 107  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 9 rewrites · forced ending)</span>

**Raw (no teacher):** sara and tom were playing with their toys in the living room. they had many toys and books. they had many toys. sara noticed a lot of the toys on the floor. she wanted to play with them, but tom said no. sara was getting ready to go. tom was scared and did not want to go. he grabbed his toys and aimed at sara. he pushed her with his sword and made it zoom fast." no, sara! get up!" tom cried.

**Teacher-guided:** sara and tom were playing with their toys in the living room. they liked to pretend they were fairies and dress up to each other. they also had a lot of fun. but then they made a loud noise. it made a big mess in their room. mom came into the room and saw the mess. she was not happy." what did you do?" she asked." it was a mess and it is not done. you have to clean up and say sorry. and you have to clean your room. and then you can have breakfast.


## 108  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 8 rewrites · forced ending)</span>

**Raw (no teacher):** once upon a time, there was a little girl named lily. she had a toy train that she loved to ride on. one day, her mom asked her to annie to play with her trains. lily was so happy to help and she hugged her mom. she put all the trains in a box and set them on an enormous track of trains. she spread the trains in the track and said," it's so colourful!" as they drove to the top, the train started to move. as lily got to the top, she noticed a little bird trying to fit its wheels. she said," hello, little bird." the little bird said," you are very brave! can you help me tie the things with me?" lily said," of course!

**Teacher-guided:** once upon a time, there was a little girl named lily. she had a toy train that she loved to ride on. one day, she went to the park with her mom. lily saw a big tree with lots of leaves. she asked her mom if she could play with the toy. her mom said," no, lily. the toy in the park." lily said," mom, we need to go outside and play!" her mom said," okay, let's go outside and play. then we can play together!" they played all day. they had so much fun playing hide and seek. after a while, lily's mom came outside and said," let's go go home now.


## 109  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 4 rewrites · forced ending)</span>

**Raw (no teacher):** once upon a time, there was a boy named timmy. timmy loved to play outside and explore. one day, he found a big white tube in his backyard. he knew that it looked dangerous and he thought they might hurt him. timmy thought he could use it to make a cool noise. timmy's mom told him to behave and not be scared either. timmy listened to his mom and they went inside together. suddenly, timmy slipped on the slide and fell on the ground. he scraped his leg and tried to help, but it was too late. the next day, timmy's mommy took him to the hospital. she was very upset and felt really hurt. the doctors ate bad bad bad ending and they learned to be more careful when they try to break things.

**Teacher-guided:** once upon a time, there was a boy named timmy. timmy loved to play outside and explore. one day, he found a big white tube in his backyard. he picked it up and showed it to his mom." this is a fine tube, mommy!" he said cheerfully." it's important to keep it safe," said his mom. but timmy did n't want to keep it. he decided to go back inside to play. after playing, his mom said," timmy, you need to go back inside now." timmy reluctantly got to clean up the tube and went back inside. after he finished playing, the sun went out and timmy looked inside and saw the pretty beautiful tube. it was very pretty and made him very proud.


## 110  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 10 rewrites · forced ending)</span>

**Raw (no teacher):** day, tim and kim went to the park. they saw many flowers and trees. they liked to play on the swings and the slide. they saw a big truck. the truck was siren and the truck had a horn. tim and kim wanted to play with the truck. tim said," come with me!" tim and kim were scared and did not want to go back. they started to cry. they wanted to play with the truck too. but their mom said," no, it's not safe. the truck is not safe now.

**Teacher-guided:** once upon a time, there was a little girl named lily. she loved going to the park with her mommy. one day, they went to the park and saw many things. lily asked her mommy," what's that?" her mommy replied," it's a colorful swing on the swings." lily pointed to a butterfly around the park. she saw a fly flying very high up and got very happy. after a while, lily said," mommy, it's time for lunch." her mommy replied," okay lily, we'll get to eat some cookies later." they went home and had lunch. lily's mommy gave her a big plate of cookies and lily ate them all. it was so much fun! after dinner, lily and her mommy went home.


## 111  <span style="font-weight:normal;font-size:0.7em;color:#999">(12 sentences, 9 rewrites · natural ending)</span>

**Raw (no teacher):** lily was a chubby girl who loved to call her favorite toy. she would whisper stories to everyone around her. one day, she found a secret behind the tree. it was a special box. she opened the box and showed it to all her friends. everyone thought it was so exciting. at last, they all were a bit tired. lily felt happy that she had spent the day at the store. she wrote about at the store and wrote through the shelf. even if she liked the colorful couch, she could even see the picture. the end.

**Teacher-guided:** once upon a time, there was a little boy named timmy. timmy loved to play in the park with his friends. one day, timmy and his friends decided to go for a walk. they saw a big mushroom near a tree. timmy was so excited and wanted to pick it up. but his friends asked him," come on, let's go play!" and so they went off to play together, having fun. when it was time to go home, timmy was tired but his friends knew it was time to relax. he and his friend sat on a bench and looked around the park. then, timmy saw a little boy playing with the mushroom. timmy was so happy and excited. now, timmy could n't wait to play some more!


## 112  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 7 rewrites · forced ending)</span>

**Raw (no teacher):** lila and ben were playing on the slide. sara liked to slide, but ben was scared. he had a red ball with his ruler." sara, lily, ben, be alert!" ben said." the ball is soft and soft. he likes me"" no, ben, that is my turn!" lila said. she reached for the ball." no, ben, the ball is mine!" ben said. he pulled the ball with his hand.

**Teacher-guided:** once upon a time, there was a little mole named benny. benny loved to play in the woods with his friends. one day, benny and his friends were playing in the woods. they saw a big rock on the ground. benny wanted to play with the rock! but his friends said they could not play with it. benny was sad and did n't want to play with his friends. as they played, a big dog saw them and wanted to play with them. benny said," yes, let's play!" they played together and had so much fun. but then, benny accidentally knocked over a rock and it broke into many pieces. benny's friend cried and said," do n't worry, we can overcome it." they cleaned up the rock and created a beautiful picture.


## 113  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 8 rewrites · forced ending)</span>

**Raw (no teacher):** one day, mom and dad took their 3 year old son to the bathroom. they gave mr. infant a big hug and smiled. he said it was time to go inside the bath. the infant was so excited! he crossed the tub with a big smile. mom and dad were excited to show them how much the infant was. the daughter shouted," mommy, can we go and play together? it's so much fun!â€ the infant laughed and took the way home. when they arrived at the hospital, the infant was so happy to have a dependable ride. he said he was sure to get to the bath. he jumped in and ran around the bath and played with his new toy. then the infant got a towel and started to clean.

**Teacher-guided:** one day, mom and dad took their 3 year old son to the bathroom. the boy was excited and wanted to stay in, but mom said," no, it's getting too dangerous." the boy was sad and said," i do n't know, mom. i'm scared." mom then replied," you must be careful not to play." the boy started to cry." do n't worry," she said." i'll help you." they went to the bathroom and grabbed mom's hand. then they worked together to pick up the soap. it was shiny and shiny! the boy was so happy. he smiled and said," yay!


## 114  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 9 rewrites · forced ending)</span>

**Raw (no teacher):** lily was the king and she had a crown in her hand. she gave it to her queen." no, no!" said lily." and i am bad. i will hit the stone alone." the king held his crown and pulled her crown. he reached the bottom of the castle and reached for the crown. lily broke it and tasted it. she cried. she cried and cried." ha, my crown is mine!

**Teacher-guided:** once upon a time, there was a little girl named lily. she loved to play outside and explore bugs. one day, she found a shiny red hoop on the ground. she picked it up and showed it to her mom." look, mommy!" she said." yes, let's play a game!" lily was so happy with her new hoop! she hugged her mom and said," thank you, mommy. you're the best!" her mom smiled and said," you're welcome, lily. you're welcome to play a game now."


## 115  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 8 rewrites · forced ending)</span>

**Raw (no teacher):** once upon a time, there was a little dog named a snowman. he had a big red nose and a long tail. one day, he saw his nose and ran to the park. he wanted to reach it, but it did not go. he just stayed there, tired but kept walking. suddenly, the snowman came running and shook his head." i'm okay," said the snowman." i can not see my sharp nose." the snowman was scared but then he had an idea. he knew he could help him find his way down, but he was very fast. he reached his destination and mud for his tail. the snowman was so happy!

**Teacher-guided:** once upon a time, there was a little dog named a snowman. he had a big red nose and a long tail. one day, he saw a big box of toys. the snowman was very cheerful and wanted to play too. but then, a big, mean dog came up and saw the toys. the dog wanted to play too. so, the dog took the toys from his toy box. the dog saw the toys and felt happy. after playing with the toys, the dog went to his room. he went to his room and ate some hot milk to eat. the dog saw his mom and wanted to play with him because he did n't know how to jump. so, he went to his bed and closed his eyes. he closed his eyes and fell asleep.


## 116  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 7 rewrites · forced ending)</span>

**Raw (no teacher):** sara and tom are hungry. they like to eat things. they hear a loud noise. they hear a loud noise. they run to the kitchen. the dishwasher is dirty. they are very scared." oh no!" sara says." we are sorry," tom says. they are sad. they look at their toys.

**Teacher-guided:** once upon a time, there was a little girl named lily. she loved to watch cartoons on her big, green tv. one day, her little brother, tom, wanted to watch television. lily said," no, i want to watch television. it's mine." but tom did n't listen. lily started to cry. tom came over to lily and said," i want to watch tv. i want to look at it." lily felt sad and said," why ca n't we watch television?" tom did n't listen and kept walking. lily remembered that her brother was being selfish. she took turns to scratch it and felt sorry.


## 117  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 11 rewrites · forced ending)</span>

**Raw (no teacher):** tom and mia were very angry. they did not want to play with their car. mom pulled them up and said," that's no tea, tom and mia. you have to eat your tea for dinner. and you need to wash your cups and put them away. you need to wash your cups first, then you will get the cup ready." tom and mia did not want to use the sink. they said," no, mom. we do not have a tea. they are soft and soft and likes. they smell good." mom came to the kitchen and looked at the bottle.

**Teacher-guided:** once upon a time, there was a kind little bunny who loved to play in the mud. one day, his friend benny saw him playing with soap on his nose." oh no!" said benny." that's not nice. we do n't want to play with it anymore." benny thought for a moment. he decided to try trying to twist the soap aside with his towel. he tried to twist the soap, but it made a loud noise." ouch!" shouted bunny." it hurts!" benny felt sad and did n't know what to do.


## 118  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 7 rewrites · forced ending)</span>

**Raw (no teacher):** tom and lily were playing with their mom in the park. they liked to pretend they were knights and explorers. tom wanted to make their cars go fast and jump in the water." jump, lily, you are so fast!" his mom said. lily tried to jump off the water and hard. but it was too difficult for tom to jump. she had to give it a chance to come out." no, mommy, i do n't want to jump." she said." the water is too deep. it can jump in me.

**Teacher-guided:** tom and lily were playing with their mom in the park. they liked to pretend they were knights and explorers. they had a lot of fun by cardboard tools and sticks." look, mom, i have something special!" tom said." look what i found! a tape!" lily said." maybe it will make a rocket!"" yes, tom, that is a great idea!" lily said." but we need to work and move the sticks around the tree." they got on the wall and put the tape in the box.


## 119  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 5 rewrites · forced ending)</span>

**Raw (no teacher):** once there was a little girl named mittens. mittens had a big hat and a shiny hat. mittens loved to wear long vest all around her. one day, mittens saw a great big tree. mittens thought it was looking yummy to eat. mittens asked his mom if she could have some hot cocoa to eat. her mom said yes and they bought some hot cocoa. mittens was so happy to have a yummy cocoa. later, mittens's mom gave her a cold umbrella to drink. mittens did n't wait to get inside. mittens ate his cocoa and felt very much better. mittens was sad because he thought about his favorite toy.

**Teacher-guided:** once there was a little girl named mittens. mittens loved to run around outside and explore. one day, mittens noticed a big cloud in the sky. it looked like a big, thick cloud coming out. mittens sniffed at the cloud and noticed that it was very high up. mittens loved running and jumping around, trying to jump back and forth. mittens was too small to reach for the cloud and back. just then, mittens saw a little squirrel playing nearby. mittens decided to follow the squirrel. as they raced together, mittens pointed at the big, cozy sky. mittens looked up and saw a little rabbit hopping around. mittens said," hi, little rabbit! what a nice cloud!


## 120  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 9 rewrites · forced ending)</span>

**Raw (no teacher):** mommy was helping her with the daughter. she liked to help her daughter measure things. every day she used to measure over the chalks. one day, she asked her mom for a paintbrush and her dad said," yes, you can, and i'll help you measure my hair." mommy told him that it was very bright and gave her a lot of effort. after a few minutes, the daughter came running to the shop and asked her what she needed. her mom said," i need to measure the number!" the daughter was very happy. she finally took one and measured the number and measured the each piece eat it. she was a small colour than before! the daughter was so proud of her measuring skills and smiled at her mom. she was very proud of her what she had done.

**Teacher-guided:** once upon a time, there was a little monkey named billy. billy was very cheerful and loved to play. one day, billy went to the park to play with his ball. when he got there, he saw a cute puppy. billy wanted to pet the puppy, but he could n't. billy tried to pet the puppy. he tried to pet it, but it was wet. billy did n't want to scare the puppy away. billy's owner came over to help. she gave him a big hug. the puppy was happy to help. billy was not hurt anymore. he thanked his owner and went home.


## 121  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 10 rewrites · forced ending)</span>

**Raw (no teacher):** tim and jen were brothers who liked to play hide and seek in the park. they read stories about animals and trees and bridges. one day, tim found a big box in the park. he wanted to steal it, but jen said no." no, it is mine. go away, and you have to give it back. have a bad dream." tim and jen felt sad and wished they had not fought the box. they wished they had not fought over the box. they had to go home with their moms. they did not call the police. they did not know what to do.

**Teacher-guided:** sam and ben were friends who liked to play with their boats. they had a lot of fun. one day, they went to the harbor with their boats and they saw a white boat on the surface. they wanted to lift the boat, but they did not know how. they looked around, but they could not find any other boats. they were very sad and angry. mom and dad heard them and came to the harbor." what's going on here?" mom asked. they knew they had to find something that was not for them." maybe it's a fish," ben said." it's a fish. and it's a net.


## 122  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 7 rewrites · forced ending)</span>

**Raw (no teacher):** once upon a time, there was a little girl named lily. she loved to play outside and explore the world around her. one day, she found a mysterious bottle from the kitchen floor. she decided to rub it through the drawer to see what was inside. as she looked closer, a magical fairy appeared from behind a big, tiny spider. lily was amazed by how beautiful it looked. the fairy asked lily," what is this?"" i do n't know," the fairy replied." it's very special and sparkly. just like it," replied the fairy." that's a wish," said lily." but can i forgive you?

**Teacher-guided:** once upon a time, there was a little girl named lily. she loved to play outside and explore the world around her. one day, lily's friend, sally, came over to play. sally said," i found a secret place. it is a fun place to sleep." lily said," wow, that's a great place! you will have fun for some time." sally smiled. as they played, sally said," let's go and play!" so, they played and had a fun day. when it was time for dinner, lily said," let's go home and we can rest." sally agreed and they both went home. they both rested and had lots of fun.


## 123  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 7 rewrites · forced ending)</span>

**Raw (no teacher):** one day, a little girl wanted to help. she began to polish it, and she wanted to add to each shape and make it happier. she used some buttons and pressed them on the paper. it made shapes and shapes. she thought it was very funny and very nice. the little girl smiled as she flew off to make shapes shapes on their faces. she decided to have a special measure. she made sure that all the shapes normally made shapes - different shapes and shapes. but then something strange happened. a big red round metal marbles appeared in the grass. the little girl was sad that her build. her mom said," it's okay.

**Teacher-guided:** once upon a time, there was a little boy named timmy. timmy loved to play hide and seek with his friends. one day, timmy's friend billy came over to play. billy saw that timmy was hiding behind a big bush." look, sammy! i found a big box!" said billy. billy laughed and they played for a long time, while they laughed and had lots of fun. when they were done playing, timmy's mom gave him a big hug." it's okay," said timmy." thank you for finding me."" bye, billy. i will come back again soon.


## 124  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 7 rewrites · forced ending)</span>

**Raw (no teacher):** ben and lily liked to dance. they danced in the sink with their toys, but they were not moving. they felt lonely. they started to feel scared." mom, the stairs will turn away," ben said." i know you like this wardrobe. loud noises are not for us. it is different. you need a lot of money to pay attention." lily and ben felt sorry. they did not want to make mom angry. they did not like their toys.

**Teacher-guided:** once upon a time, there was a dog named max. max liked to play with his ball in the park. one day, max went to the park with his friends. they played and had fun. max went around in the park, and he saw a big car. the car was shiny and had a big horn. max wanted to play with the car too. max said," i want to ride the car." a little girl named lily saw max. she wanted to play with him! so max asked," can i play with the car?" lily shook her head. timmy said," no, the car is mine!


## 125  <span style="font-weight:normal;font-size:0.7em;color:#999">(9 sentences, 5 rewrites · natural ending)</span>

**Raw (no teacher):** once upon a time, there was a little boy named timmy. timmy had a large truck and he loved to play with it. one day, timmy's mom came over to give him a new magnet for him. timmy did n't like it because he touched it with his mouth. he giggled with joy. after a while, timmy asked his mom if he wanted to take the magnet outside. his mom said no because she loved him. timmy was sad that his mom was sorry for him because he wanted to write her letter to him. but then he wanted to stay and play with his new toy for a few time. so, timmy went to his room and drew a big squash. he drew a few pieces and then he felt like he was. suddenly, timmy's mom came into the room and saw timmy fighting.

**Teacher-guided:** once upon a time, there was a little boy named timmy. timmy had a large truck and he loved to play with it. one day, timmy's friend came over to play. his friend's friend was sad because he wanted his toy truck too. timmy started to play with his truck and he saw that it was broken. timmy said," do n't worry, i can fix this toy. we can fix it together." so, he completely fix it. timmy and his friend fixed the toy car and he was happy again.


## 126  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 10 rewrites · forced ending)</span>

**Raw (no teacher):** mia and ben were twins who liked to play together. they had many toys, but their favorite was a big red ball that could bounce around. the ball was red and hard, but it was very dirty." no, ben, this ball is dirty!" mia said," the ball is not good for you. go away, ben and mia!"" no, mia, do n't! getting the ball away!" ben said, pulling at the ball. mia was angry and ran after ben and mia. but ben was very fast. he hit their ball and made a loud noise.

**Teacher-guided:** once upon a time, there was a little girl named lily. she loved to play outside in the sun. one day, she saw a shiny object on the ground. she was curious and took it home to play with. she started to play with it and it made a lot of noise. suddenly, a dog came running towards her. lily got scared and quickly ran away. after a while, her mom hugged her tightly and said," it's okay. let's clean up the broken object together, but we'll be careful." lily smiled and was happy to have her mom. she thanked her mom and hugged her." thank you, my mommy!" she said.


## 127  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 9 rewrites · forced ending)</span>

**Raw (no teacher):** lily and tom were playing with their toys in the living room. they had made a big mess, but they had not pulled the toys. mom gave them to tom and said," you need to be careful with your toys. you need to be organized and tidy up your toys." but tom and tom did not listen. they said," ok, mom. we are sorry." their mom said," we will tidy up after now, and then you do n't need to clean up your toys. and then we can clean chairs and clean the room." tom and tom nodded. they would. they said," ok, mom.

**Teacher-guided:** lily and tom were playing with their toys in the living room. they had a big box of windows and buttons." hello," lily said." do you want any noise?"" yes, please!" tom said." i will be gentle and gentle." they played with their toys and talked. they had fun making noises and stories on the floor. then they heard a noise. it sounded like thunder. it was thunder. mommy smiled and said," it's time to go home.


## 128  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 10 rewrites · forced ending)</span>

**Raw (no teacher):** once upon a time there was a little girl named lily who loved summer. she loved to play hide and seek with her toys and search for something to eat. one day, she found a puzzle in her room. she felt so happy and did n't know how to eat it all. luckily, she just did n't know what to do. the puzzle made out of paper, a shelf with lots of her everywhere! lily was sad and cried because she could n't solve it. later that day, she went to the kitchen and saw her neighbor was broken. her owner was very upset and told her what happened. lily felt bad and offered to help him. her neighbor was so happy, and they both spent the whole day together. the day was no longer gloomy because it was still raining.

**Teacher-guided:** once upon a time there was a little girl named lily who loved summer. she would run and play and have lots of fun. one day, lily noticed a strange acorn in her backyard. she wondered what it was. she did n't know what it was, so she asked her mom," what is that?"" it's an acorn, lily. but first, you have to wait. what does that mean?" her mom said. lily thought for a moment and then nodded her head. she hopped to the acorn and waited. later that day, lily thought about the unusual acorn she had heard. her mommy said," lily, it's time to go to bed.


## 129  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 8 rewrites · forced ending)</span>

**Raw (no teacher):** ben and mia are friends. they like to play with their toys. but they do not see that their favorite is a big truck. the truck has a long wheels too. the truck says the truck is the driver. ben and mia stop splashing. they show their cars to their cars and cars. they make them zoom and cars go fast. one day, lily and ben are playing with their cars when they see a big truck. the truck has a loud horn and has bump out of it." bang!" ben says.

**Teacher-guided:** ben and mia are friends. they like to play in the kitchen. one day, they see a big tub with water. they want to try it." can we go to the bathroom and get soap?" mia asks." no, no!" ben shouts." the water is dirty. you need to wash your teeth. you can have a bath with soap and water. it will make you clean and clean."" okay, mom.


## 130  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 8 rewrites · forced ending)</span>

**Raw (no teacher):** tom and sam are friends. they like to play in the park. one day, they see a big bird in a tree. the bird is very shiny and has a long nose. it can not fly." look, sam, a bird!" tom says." do you want to hear me?"" no, sam, no!" sam says." the bird flies away."" now, go away!

**Teacher-guided:** once upon a time, there was a little girl named lily. she loved to play in her room. one day, she went outside to play. she ran and ran and ran until she could hear a noise. she started to panic and ran towards her mom." what's that noise?" she asked." it's me," her mom replied. lily's mom hugged her and said," it's okay, you'll get it for a new adventure." lily was amazed. she knew that the noise would be fun and that made her feel safe. from that day on, she played with her friends and were always eager to learn new things. the moral value of the story is that it's important to be safe and stay safe.


## 131  <span style="font-weight:normal;font-size:0.7em;color:#999">(10 sentences, 6 rewrites · natural ending)</span>

**Raw (no teacher):** lily liked to eat hay for breakfast. she also liked to eat carrots and bugs. she also liked to try new things. she had many hay for her when she ate. but her favorite thing to wear every day. it was her favorite hay. it was soft and soft and had a picture of a big dog on it. one day, lily noticed that her favorite toy was a green belly with tunnels. it looked like a unicorn, a purple dinosaur that made lovely noises like a panda. lily looked at the sun and wondered what was on. she decided to try it on her own. but when she tried it, she slipped and fell to the ground.

**Teacher-guided:** one day, lily went to the park with her mom. she played on the swings and had fun. when it was time to go home, lily's mom said it was time to go home. lily did n't want to go to the park anymore. but her mom said it was okay. she told lily that everything was okay. lily and her mom went home. when they got home, lily's mom was standing with a big smile. lily felt very happy to be with her mom. she knew that lily was important and it was much better to be kind.


## 132  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 9 rewrites · forced ending)</span>

**Raw (no teacher):** tom was a young boy. he had a big bag of candy. he still had a bag of candy on his shelf. he wanted to have something to eat and candy. he liked how much candy was for a lot. he put his bag to his room until he was older." tom, can i have some candy, please?" he asked." no, you ca n't. it's not an apple, and you need to buy something else. you have many candy left for rules. did not listen to your mom.

**Teacher-guided:** tom was a young boy. he was only three years old and very curious. he wanted to see what was inside. he bent down and looked around. suddenly, he heard a voice. it was his mom." tom, what are you doing?" it was his mom's voice from the kitchen. she said" tom, the food is too spicy for you." tom giggled and nodded. he loved his mom very much. from then on, tom was careful not to disturb any more spicy food. he also learned his lesson - he knew that being careful around a big house could n't get into trouble.


## 133  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 6 rewrites · forced ending)</span>

**Raw (no teacher):** once upon a time, there was a little boy named tim. tim loved to play outside in the woods with his friends. one day, they found a big tree that looked very happy. tim said," wow, wow, look at that big blue tree! i know you found something big like the bird!" tim thought for a moment and said," i think that's a good idea, tim! i know what to do if i could be lily!" tim thought about it and thought for a moment. he put down a red ball in tim's spot. they both laughed and played with the red ball. after a while, tim gave the red ball back to tim, and tim played together in the woods. they had such good friends.

**Teacher-guided:** once upon a time, there was a little boy named tim. tim loved to play outside in the woods with his friends. one day, tim's friend, sam, came over to play. tim saw the dirt on the ground and said," let's play with the dirt!" sam agreed and they played with the dirt for a while. tim played with his friends and had fun. after a while, a big storm came and the sun went down. tim and sam went home. they were happy. they played and became good friends. they played together and had lots of fun. tim was not lonely anymore. the rain was not beautiful anymore.


## 134  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 7 rewrites · forced ending)</span>

**Raw (no teacher):** once upon a time, there was a little girl named lily. she loved to draw and draw. one day, she was drawing with crayons. she drew a big, wide picture of a big blue sky. she wanted to draw the clouds too, so she grabbed a crayons and wrote about the sun. suddenly, lily saw her brother tom crying. she ran over and hugged him." are you okay, lily?" he asked." i did n't know," said lily." but i still have many markers," said tom. lily thought for a moment and then," i have an idea.

**Teacher-guided:** once upon a time, there was a little girl named lily. she loved to draw and draw. one day, she was drawing with crayons. she drew a big, wide picture of a big blue sky. one day, lily went to the park to draw with her favorite crayon. she loved to draw and color circles. but then, she accidentally broke her crayon on a big box. lily was very sad because she felt very sad. her mommy asked her what was wrong, and she told her that she could not draw anymore. lily went to the park and saw a big, round ball. she wanted to catch the ball, so she tried to catch it. but it was too high up and flew away, so lily could n't. she was so sad that she started to cry.


## 135  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 9 rewrites · forced ending)</span>

**Raw (no teacher):** tom and lily were friends who liked to play together. today, they decided to have a picnic. they ate milk and prunes from the kitchen. tom wanted to eat some sweet grapes and make a big mess." can i, in the kitchen?" lily asked, looking at the dough." first, you can have some. then you can play with your cars, or i will make a big mess, and i will save your son first!" tom and lily followed tim to the living room. they followed mom and dad to the kitchen. they saw many tape on the table. they saw a red sauce on the table.

**Teacher-guided:** tom and lily were friends who liked to play together. they had a lot of fun and made up stories together. one day, they saw a big, shiny coin on a shelf. the coin was blue and shiny and had pictures on it." look, a coin!" said tom. lily thought it was a pretty coin. she picked it up and held it in her hand." wow, that is amazing! a coin! it is so pretty! can i play with it?" she asked.


## 136  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 10 rewrites · forced ending)</span>

**Raw (no teacher):** once upon a time, there was a little boy named tim. tim liked to play with his toy cars and planes. one day, his mom told him that they had to make a big race and succeed in getting the work. tim was sad because he loved his cars and wanted to win. but then, his mom disagreed and said they could not agree. tim felt sad and did not want to win. then, his mom put a piece of paper on the sink and in the garage. tim was very happy and able to win the race!

**Teacher-guided:** once upon a time, there was a little boy named tim. tim liked to play with his toy cars and planes. one day, he went to the park to visit his friend, sam. sam said," let's play together!" they played on the swings and had lots of fun. tim and sam played with the toys in the park. sam was very happy. but then it started to rain." oh no, it's raining!" tim said. he did n't know what to do. tim felt sad and went home. tim played with sam for a while, then went back to sam's house.


## 137  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 3 rewrites · forced ending)</span>

**Raw (no teacher):** once upon a time, there was a little girl named lily. she loved to play outside and explore the world around her. one day, she went for a walk in the park and saw a big tree. she decided to climb it. as she climbed up, she felt so happy and excited to see the birds flying around her. as lily climbed, she saw something sparkly on the ground. it was a pretty bracelet! lily had never seen anything like it before, but she was also very sad because she wanted it. her mommy showed her how to count a new bike car. lily loved winning the train, even when she finally reached the park. the butterfly happily picked up and handed her five - a lollipop. lily was very happy that her mommy helped her feel better.

**Teacher-guided:** once upon a time, there was a little girl named lily. she loved to play outside and explore the world around her. one day, she went for a walk in the park and saw a big tree. she decided to climb it. as she climbed up, she felt so happy and excited to see the birds flying around her. suddenly, she saw a little bird with a hurt wing. she did n't know what to do. her mommy helped her take a rope to a tall forest. lily was so excited to climb up the tall tree. she climbed up the tree and carefully, she reached the top. but when she got there, she slipped and fell down! her mommy saw what happened and gave her a big hug. lily felt brave and promised to never climb there again.


## 138  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 11 rewrites · forced ending)</span>

**Raw (no teacher):** tom and sam are twins. they like to play in the park. but the weather is hot and the tough. they make mud castles and go to the park." let's go to get the rope, mom!" tom says." you must be careful. you will do more a lot, and then you can climb the slide and have fun!" sam does not listen. he does not like to be careless. he wants to go back to the park and splash sand again. he does not want to play with his toys.

**Teacher-guided:** once upon a time, a little boy named tom lived in a small house with his mom and dad. one night, tom went to the park with his mom. he saw a big puddle and he wanted to splash. he went to the puddle and splashed around it, but he slipped and fell down. his mom said," tom, do n't be afraid, you need to be careful. it's not safe." but tom did n't listen. he saw a big puddle of water and ran to it. he wanted to jump in the puddle and splash around with his mom. but his mom was firm. she said," tom, be careful. the puddle can make water wet and dirty." tom was scared of the splash, but he remembered his mom's advice and followed his rules.


## 139  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 10 rewrites · forced ending)</span>

**Raw (no teacher):** ben loved to play with balloons. he had many balloons of balloons and balloons that he wanted to play. but his favorite was vanilla. he wanted chocolate too!" wow, ben! these are rich!" ben said." your sprinkles are big and smooth. mom gave us a chocolate."" thank you, ben," his mom said." i'm glad here is, ben. the attractive one was shiny and yummy.

**Teacher-guided:** once upon a time, there was a gray cat. the cat liked to play with his toys all day long. one day, the cat was playing with his toys when it saw a shiny marble. the cat wanted the marble. the cat wanted the marble, but it did n't know how. then, a big dog came by and saw the marble. the dog wanted the marble, but the dog was n't being nice. he tried to grab the marble, but it was too quick. the dog got angry and ran away. the cat chased after him, and the dog disappeared inside. the cat was sad and cried. the cat was gone to his mommy. she called for help, but there was no more.


## 140  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 8 rewrites · forced ending)</span>

**Raw (no teacher):** once upon a time, there was a boy named billy. billy went to the park to play. he saw a big palm tree and wanted to touch it. he asked his friend," can i touch the rock?" his friend said," no, it is too high up." billy did not want to look at the tree. he thought," maybe it's too steep," his friend replied," if you touch it, you might be too high." but timmy still did not listen. he slowly got close to the branch and he started to feel very tired. he felt disappointed that he could not touch the rock but it was too tall for him to roll in. then, he had an idea. he took his arm and found an old rock inside.

**Teacher-guided:** once upon a time, there was a boy named billy. billy went to the park to play. he saw a blue ball and he wanted to play with it. billy picked up the ball and threw it over the slide. he felt happy and he wanted to play with it. billy got to the park and started to play. he kicked the ball very hard and rolled over the slide. he laughed and had so much fun. suddenly, he tripped and fell down. billy was sad and decided to ask for help. he smiled and said," do n't worry, billy. i'll help you play with the ball. we will take you to the park and have fun together.


## 141  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 8 rewrites · forced ending)</span>

**Raw (no teacher):** ben and ben are friends. they like to play outside. one day, they see a big shiny rock. they want the rock too." let's climb it and see what is under the rock." ben says. he looks at the rock and sees a boy in the rock. the big boy is holding the rock. he wants to touch it." no, ben!" ben says. the little boy pulls the rock from his hand.

**Teacher-guided:** tom and sue were friends. they liked to play in the park. one day, they saw a big red ball. it was red and round." let's go and play!" said tom." ok!"" i'll throw the ball in the park!"" no, tom! it is not ours!" sue said." the ball is fun!" but tom did not talk.


## 142  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 6 rewrites · forced ending)</span>

**Raw (no teacher):** once upon a time, there was a little girl named lily. she loved to play outside in the sunshine. one day, she saw a mysterious pipe on the ground. she wondered what it was and decided to try it. she tried to grab it, but it was too hard. lily went to the top of the pipe and tried to hit the pipe. suddenly, it broke into pieces! lily was so scared and dropped the pipe. but it was too heavy and she was n't able to get it. luckily, some brave little girl into the park came to see what was wrong. she looked up to the ground and saw her little brother standing by the ground. she was happy to see her brother and told him it was okay.

**Teacher-guided:** once upon a time, there was a little girl named lily. she loved to play outside in the sunshine. one day, she saw a mysterious pipe on the ground. she wondered what it was and decided to try it. lily started to feel very curious but she could n't find what was inside. she got nervous because she wanted to get inside. suddenly, she heard a voice called out." little girl, what are you doing here?" it was her friend, sue. sue said" i'm trying to take the pipe to keep it. i'm riding it first!" sue was surprised and looked at the pipe." you're a good friend!


## 143  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 9 rewrites · forced ending)</span>

**Raw (no teacher):** amy and her mom went to the park. amy saw a duck in a pond. she was very excited to play with it. she wanted to catch the duck, so her mom ran to the pond. amy jumped up and down to catch the duck. but, it was too cold to try to get it. she was so sad, but her mom knew she did the same. after they finished eating, amy asked her mom if she could have the duck. her mom said yes and they went to the river. they were so happy to be at the end of the day. amy was so happy to be back for the help. she gave her mom a big hug and said," now, amy.

**Teacher-guided:** once upon a time, there was a little girl named lily. she loved to play with her toys and have fun with her toys. one day, she was playing with her toy cars in a big field. she loved to pretend, but when she was playing, she accidentally dropped the toy car in the grass." oh no!" she shouted. her mom looked worried." what is it?" she asked." it's a good car," her mom said." it's a car" sometimes things that you get lost." lily thought and thought about what to do. she remembered what her mom said about the car and put it back together.


## 144  <span style="font-weight:normal;font-size:0.7em;color:#999">(10 sentences, 6 rewrites · natural ending)</span>

**Raw (no teacher):** once upon a time, there was an elderly man who lived in a stadium. he had a funny ball and started to bounce everywhere. one day, a little boy came to the stadium. his name was tim. he saw the number of metal and wanted to touch it. tim said," can i touch the hairy toy?" tim said," no, you ca n't, tim. it is too heavy." tim's mom told him to get to the stadium where the big wheel was. she put the wheel near tim and moved it. tim and his mom switched the wheel on the wheel. when they reached the finish, tim jumped up and said," i found a heavy wheel!

**Teacher-guided:** once upon a time, there was an elderly man who lived in a stadium. he had a ball, a bear and a bunny. one day, the man noticed a little girl playing with a ball and wanted to play with it. he asked the girl," what are you doing?"" i'm playing with the ball," said the girl. the man smiled and said," do you'll play with it?" the girl thought for a moment and then agreed. together they played together all day and had lots of fun. they laughed and had so much fun! the end.


## 145  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 10 rewrites · forced ending)</span>

**Raw (no teacher):** once upon a time, there was a little girl named lily. she loved to drink juice in her cup in her cup. one day, she went to the park to play with her friends again. while playing, she saw her friend timmy playing with his cup." hi timmy!" said lily. her friend laughed and said," hi lily! what did you mean it?" lily replied," i'm playing with my cup. do you like some cookies?" timmy said," sure! let me play with you and my cup.

**Teacher-guided:** once upon a time, there was a little girl named lily. she loved to play outside in the sun. one day, she was feeling sick. her mommy took her to a hospital that made her feel better. lily went to get some medicine and drank some water. she felt better and went back to her house. she wanted to drink some milk, but her mommy was not there. she felt sad and wanted to say thank you. lily was patient and waited patiently. finally, her mommy was n't mad at her. lily felt a little better and took a sip of a cup. she smiled and said," mmm! this is my sweet scent.


## 146  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 7 rewrites · forced ending)</span>

**Raw (no teacher):** practicing silly things. one day, she got in her room and began to draw a big green picture. she worked all afternoon and soon it was time to make her turn color unusual. the little girl was so excited and said," mommy, can i visit my new picture?" her mom nodded and they walked together to the spot for a blue picture of their new picture. as they drew, they talked about how it had been to a patient time. the little girl was so excited and asked her mom why she had been working first. her mom said she was being patient and teaching them how to make a circle. the boy nodded and smiled. he thanked his mom and hurried home. from that day forward, the little girl always reminded her mom of how intelligent she was, and that you have been very brave and kind to what is to do.

**Teacher-guided:** tom and lily were playing in the park with their ball. they liked to bounce it around in circles and have fun. but then, they saw a big dog. the dog was barking. it barked and made a loud noise. tom and lily ran to the tree." no, we ca n't get the ball. it is our ball. go away," tom said." the dog is moving!" the dog was scared and stupid. tom and lily ran away from the dog. they chased each other, but they ran away.


## 147  <span style="font-weight:normal;font-size:0.7em;color:#999">(10 sentences, 9 rewrites · natural ending)</span>

**Raw (no teacher):** anna likes to find new shoes in the garden. she eats the shoes with honey and her bracelet. she writes her name in her room, and a word. she makes necklaces and repeats all the colors and different kinds of the flowers. she is very happy with her new shoes. one day, anna is in the garden with her mom. she sees that anna is very happy. she wants to show anna a new new pair. anna runs to her mom and hugs her. she says," look, mom, i found some clothes for me!" mom hugs anna and gives her a new dress. anna smiles and says," that's a pretty dress!

**Teacher-guided:** once upon a time, there was a funny man named joe. joe loved to play with his friends in the park. one day, joe's friend, a little boy named tim, saw the ball. he wanted to play with it too. tim said," let's play tag!" they were very happy to be their friend and started to play. when they finished playing, they put on their shoes and started to run around. they had so much fun! after their fun day, they all went home. they had a great time at the park.


## 148  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 7 rewrites · forced ending)</span>

**Raw (no teacher):** once upon a time, there was a little girl named lily. she was very happy to have fun and she loved to play all day. one day, she found a big red ball on the ground. she asked her mom," can i play with the ball?" her mom said," it looks really pretty." lily was so excited and wanted to play with the red ball. she asked her mom," can i play with the red ball?" her mom said," sure, lily. i can play with it." lily played with the big red ball all day, but then she accidentally bumped into the pile. she got upset and went to bed. her mom said," do n't worry, we can play together.

**Teacher-guided:** once upon a time, there was a little girl named lily. she was very happy to have fun and she loved to play all day. one day, she found a big red ball on the ground. she asked her mom," can i play with the ball?" her mom said," yes, of course you can play with it. but first, you need to be careful." lily sat on the couch and started to push the ball. the ball broke into pieces and lily got very upset and started to cry. her mom came over and asked," what happened?" lily yelled," i lost the ball." her mom hugged her and said," do n't worry, lily. i can fix it. let's make it better," she worked with a button and fixed the ball.


## 149  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 7 rewrites · forced ending)</span>

**Raw (no teacher):** tom and sam were best friends. they liked to play with toys together. one day, they saw a fake slide. they wanted to try it. they ran to the slide, but they did not see a big dog. the dog was run fast and scared. they ran towards the slide very fast. max did not look back. he bumped into the slide and fell down. he hurt his knee. he cried a loud thank you. he ran to his mom.

**Teacher-guided:** once upon a time, there lived a little boy named timmy. timmy liked to play with his toys all day long. one day, timmy went to the park with his mom. he saw a big dog with a big, loud bark. timmy was scared, so he ran away. but then, the dog came closer to him. timmy felt very scared and started to cry. his mom came and asked him what happened. timmy told her about the dog and told her why he felt scared. his mom said," do n't worry! the dog is back soon." timmy was relieved and froze. he continued to play back at the park and never forgot the scary dog.


## 150  <span style="font-weight:normal;font-size:0.7em;color:#999">(13 sentences, 7 rewrites · forced ending)</span>

**Raw (no teacher):** once upon a time, there was a little boy named timmy. timmy loved playing with his dad's toys. one day, timmy's dad came into the room. timmy loved to play with his favorite toy, a teddy bear. it was a big ball! timmy tried to jump on it, but it was too heavy for him to lift. timmy started to cry because he could n't know how to lift the ball. timmy felt sorry for fixing his friend. he knew he did n't know how to lift the ball. timmy decided to use a ruler to lift it up together. he turned the handle and it did n't fit on his head. timmy knew he could n't touch the ball anymore.

**Teacher-guided:** once upon a time, there was a little boy named timmy. timmy loved playing with his dad's toys. one day, timmy's dad came into the room. timmy loved to play with his favorite toy, a teddy bear. one day, timmy's dad came into his room and asked," what is that?" that's my teddy bear," timmy replied." that's a toy," said his dad." it's an important toy. do you want to play with it?" timmy replied." yes, please!" said his dad, and they played together for a long time. they played and had so much fun.
