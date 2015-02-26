#pragma strict
enum CharState {IDLE, MOVING};
enum Dir {UP, DOWN, LEFT, RIGHT};

class Character extends System.Object
{
	var state: 		CharState; 
	var pos: 		Vector3;
	var prefab: 	GameObject;
	var dir:		Dir;
	@HideInInspector
	var isMoving:boolean = false;

	function Character(pos: Vector3, prefab:GameObject){
		this.pos =  pos;
		state = CharState.IDLE;
		this.prefab = GameObject.Instantiate(prefab, pos, Quaternion.identity);
	
	}

	function motionTarget( dir: Dir, grid:Grid):Vector3{
		var desiredPos:Vector3 = Vector3(pos.x, pos.y, pos.z);
		switch (dir){
			case Dir.UP:
				desiredPos += Vector3.forward;
				break;
			case dir.DOWN:
				desiredPos += Vector3.back;
				break;
			case dir.LEFT:
				desiredPos += Vector3.left;
				break;
			default:
				desiredPos += Vector3.right;				
			}
		
		if (!grid.hasBox(desiredPos)){
			return desiredPos;
		}
		
		if (grid.hasBox(desiredPos) && !grid.hasBox(pos + Vector3.up) && 
				!grid.hasBox(desiredPos + Vector3.up)){
			return desiredPos + Vector3.up;
		}
		
		return pos;
	}

	function move( dir: Dir, grid: Grid ):boolean
	{
		if (isMoving) return false;
		
		var target:Vector3 = motionTarget(dir, grid);
		var mustClimb:boolean = target.y > pos.y;
//		if (target == pos){
//			Debug.LogError("Character unable to move");
//		}else if (target.y > pos.y){
//			Debug.Log("character must climb");
//		}else{
//			Debug.Log("character need not climb");
//		}
//		return;
		isMoving = true;
		Debug.Log("target="+target.ToString());
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
			
			//Rotation stuffs needed here
			
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
	isMoving = false;
	return true;
	}
	
};