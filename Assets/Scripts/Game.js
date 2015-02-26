#pragma strict
var AllPrefabs: GameObject[];
var character: Character;
var grid:	Grid;
var processing: boolean = false;
function Start () {
	Application.targetFrameRate = 50;
	character = new Character(Vector3(0,0,0), AllPrefabs[0]);
	grid = new Grid(20,20,20, character, AllPrefabs);
	var block: SpaceBox;
	var pos: Vector3;
	
	for (var i: int=0; i<20; i++)
		for (var j: int=0;j<20;j++){
			grid.CreateTile(Vector3(i,0,j));
		}
	grid.CreateBlock(Vector3(0,0, 0));
	var y: int = 0;
	var x: int;
	var z: int;
	var space: SpaceBox;
	for (i = 0; i < 120; i++){
		x = Random.Range(0,20);
		z = Random.Range(0,20);
		
		space = grid.getSpaceBox(Vector3(x,y,z));
		
		while ( space != null && space.GetType() == typeof (Block)){
			y++;
			space = grid.getSpaceBox(Vector3(x,y,z));
		}
				
		grid.CreateBlock(Vector3(x,y,z));
		y = 0;
		
	} 
}
function getControlKey(){
	var wait:float = 1;
	
	if (Input.GetKeyDown (KeyCode.UpArrow)){
		processing = true;
		StartCoroutine(character.move(Dir.UP, grid));
		processing = false;
	}
	else if (Input.GetKeyDown (KeyCode.DownArrow)){
		processing = true;
		StartCoroutine(character.move(Dir.DOWN, grid));
		processing = false;	
	}
	else if (Input.GetKeyDown (KeyCode.LeftArrow)){
		processing = true;
		StartCoroutine(character.move(Dir.LEFT, grid));
		processing = false;
	}
	else if (Input.GetKeyDown (KeyCode.RightArrow)){
		processing = true;
		StartCoroutine(character.move(Dir.RIGHT, grid));
		processing = false;
	}
	
	if (Input.GetKeyDown('t')){
		for (var i = 0; i < 10; i++){
			Debug.Log("(" + i + ",0,1)="+grid.getSpaceBox(Vector3(i, 0, 1)).ToString());
		}
	}
	
}
function Update () {
	if (processing) return;	
	getControlKey();
}