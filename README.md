# ClimberTimer
## Web Timers for Climbing Training

__Note: This is prototype software.__

- ClimberTimer offers a web interface for your climbing training timers. It's simple HTML, CSS, and Javascript that can be hosted on any server and has low overhead. It's meant to be viewed on mobile for ease of use while climbing.

- It is pre-populated with a version of the exercises detailed in Alex Barrows' [Training for Sport Climbing Paper](https://www.trainingbeta.com/wp-content/uploads/2015/05/1.-Alex-Barrows-Training-Doc-V2-for-training-beta.pdf). 

- I climb at a bouldering gym, so right now, the timers are all bouldering-focused with no roped exercises, but I will probably add other exercises as time goes on.

- The exercise timers are made up of repTime, repAmount, repRest, setAmount, and setRest.

- If you modify the categories, you'll need to create a new category page, but all exercises in that category of the exerciseDetails.json will automatically populate onto the category page.

- Excercises are detailed in the exerciseDetails.json file and can be easily modified. The webUI will automatically populate the exercise.html page with the details from whichever exercise is listed in the query field of the URL.

- Timers will beep, so Bluetooth headphones are a quality of life enhancement that will keep you from having to watch the time.
  - Beep functionality has room for improvement (countdowns, etc.). For now they beep at each phase change (Get Ready, Climb, Rest). 
