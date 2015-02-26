#pragma strict
enum CharState {IDLE, MOVING};
enum Dir {UP, DOWN, LEFT, RIGHT};

class Character extends System.Object
{
	var state: 		CharState; 
	var pos: 		Vector3;
	var prefab: 	GameObject;
	var dir:		Dir;

	function Character(pos: Vector3, prefab:GameObject){
		this.pos =  pos;
		state = CharState.IDLE;
		this.prefab = GameObject.Instantiate(prefab, pos, Quaternion.identity);
	
	}

	function move( dir: Dir, grid: Grid )
	{
		Debug.LogError(pos.ToString());
		var frames: int = 50;
		if (this.dir != dir){
			this.dir = dir;
			var finalR: float;
			switch (dir){
			case Dir.UP:
				finalR = 0;
				break;
			case dir.DOWN:
				finalR = 180;
				break;
			case dir.LEFT:
				finalR = 270;
				break;
			default:
				finalR = 90;				
			}
			
			//ROtation stuffs needed here
			
			return;
		}
		
		var dPos:Vector3;
		var fPos:Vector3;
		var moveEachFrame: float = 1.0/frames;
		switch (dir){
		case Dir.UP:
			dPos = Vector3(0,0,moveEachFrame);
			fPos = Vector3(pos.x,pos.y,pos.z+1);
			break;
		case Dir.DOWN:
			Debug.LogError("Down!");
			dPos = Vector3(0,0,-moveEachFrame);
			fPos = Vector3(pos.x,pos.y,pos.z-1);
			break;
		case Dir.LEFT:
			dPos = Vector3(-moveEachFrame,0,0);
			fPos = Vector3(pos.x-1,pos.y,pos.z);
			break;
		default:
			dPos = Vector3(moveEachFrame, 0,0);
			fPos = Vector3(pos.x+1,pos.y,pos.z);
		}
		Debug.LogError(pos.ToString());
		for (var i:int=0;i<frames;i++){
			pos = Vector3(pos.x + dPos.x,
						pos.y + dPos.y,
						pos.z + dPos.z);
			prefab.transform.position = pos;
			//yield WaitForSeconds(.01);
		}
		Debug.LogError(pos.ToString());
		//dyield WaitForSeconds(1);
	}

	
};