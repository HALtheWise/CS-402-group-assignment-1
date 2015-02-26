#pragma strict
var matLitUp: Material;
var matClicked: Material;
var matIdle: Material;
function Start () {

}

function Update () {

}

function OnMouseOver()
{	
	Debug.LogError("Whatzz");
	if (Input.GetMouseButtonDown(1))
			renderer.material = matClicked;
	else renderer.material = matLitUp;		

}

function OnCollisionEnter(collision : Collision){
	Debug.LogError("Whatzz");
}

function OnMouseExit()
{

			renderer.material = matIdle;

}