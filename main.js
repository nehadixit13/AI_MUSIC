song="";
song2="";

leftWristX=0;
leftWristY=0;
rightWristY=0;
rightWristX=0;
scoreleftWrist=0;
scorerightWrist=0;

song_status="";
song_status2="";


function preload(){
song=loadSound("music.mp3");
song2=loadSound("music2.mp3");
}

function setup(){
canvas=createCanvas(600,500);
canvas.center();

video=createCapture(VIDEO);
video.hide();

poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function draw(){
    image(video,0,0,600,500);

    song_status=song.isPlaying();
    fill("#FF0000");
    stroke("#FF0000");
if(scoreleftWrist>0.2)
{
    circle(leftWristX,leftWristY,20);

    song2.stop();
    if(song_status=='false'){
        song.play();
        document.getElementById("song").innerHTML="Playing song-Peter Pan";
    }
    song_status2=song2.isPlaying();
    song.stop();
    if(scorerightWrist>0.2)
    {
        circle(rightWristX,rightWristY,20);
        if(song_status2=='false')
        {
            song2.play();
            document.getElementById("song").innerHTML="Playing song-Harry Potter";
        }
    }

}
}

function modelLoaded(){
    console.log('PoseNet Is Initialized');
}

function gotPoses(results){
    if(results.length>0)
  {
   console.log(results);
   scorerightWrist=results[0].pose.keypoints[10].score;
   scoreleftWrist=results[0].pose.keypoints[9].score;
   console.log("scoreleftWrist = " + scoreleftWrist);
   leftWristX=results[0].pose.leftWrist.x;
   leftWristY=results[0].pose.leftWrist.y;
   console.log("leftWristX = "+ leftWristX + "leftWristY = "+ leftWristY );

   rightWristX=results[0].pose.rightWrist.x;
   rightWristY=results[0].pose.rightWrist.y;
   console.log("rightWristX = "+ rightWristX + "rightWristY = "+ rightWristY );
   }
}



