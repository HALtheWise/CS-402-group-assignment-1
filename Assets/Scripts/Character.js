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
		
		if (!grid.hasBox(desiredPos) && grid.hasBox(desiredPos + Vector3.down)){
			return desiredPos; //Do not step up or down
		}
		
		if (grid.hasBox(desiredPos) && !grid.hasBox(pos + Vector3.up) && 
				!grid.hasBox(desiredPos + Vector3.up)){
			return desiredPos + Vector3.up; //Step up
		}
		
		if (!grid.hasBox(desiredPos) && !grid.hasBox(desiredPos + Vector3.down) && 
				grid.hasBox(desiredPos + Vector3.down + Vector3.down)){
			return desiredPos + Vector3.down; //Step down
		}
		
		return pos;
	}

	function move( dir: Dir, grid: Grid )
	{
		if (isMoving) {
			Debug.LogError("isMoving was true");
			return;
		}
		Debug.Log("stuff");
		
		var target:Vector3 = motionTarget(dir, grid);
		var mustClimb:boolean = target.y > pos.y;
		if (target == pos){
			Debug.LogError("Character unable to move");
			return;
		}
//		else if (target.y > pos.y){
//			Debug.Log("character must climb");
//		}else{
//			Debug.Log("character need not climb");
//		}
//		return;
		isMoving = true;
		Debug.Log("target="+target.ToString());
		var frames: int = 10;
		if (target.y != pos.y) frames *= 3; //Climbing is slower
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
			
			//return;
		}
		var startPos:Vector3 = pos;
		var endPos:Vector3 = target;
		for (var i:int=0;i<frames;i++){
			prefab.transform.position = Vector3.Slerp(startPos, endPos, (i+1.0)/frames);
			yield;
		}
		pos = endPos;
		//dyield WaitForSeconds(1);
		isMoving = false;
		return;
	}
	
};