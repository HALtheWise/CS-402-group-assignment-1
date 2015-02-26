#pragma strict
enum GridState {IDLE, INGAME};
class Grid extends System.Object{
	var prefabs: GameObject[];
	var grid: SpaceBox[,,];
	var character: Character;
	var state: GridState;
	
	function Grid(w: int, h: int, d: int, c: Character, prefabs: GameObject[]){
		state = GridState.IDLE;
		this.prefabs = prefabs;
		character = c;
		grid = new SpaceBox[w,h,d];
	}
	
	function getSpaceBox(pos:Vector3){
		return grid[Mathf.RoundToInt(pos.x), Mathf.RoundToInt(pos.y), Mathf.RoundToInt(pos.z)];
	}
	
	function hasBox(pos:Vector3):boolean{
		if (pos.x < 0 || pos.y < 0 || pos.z < 0) return true; //TODO: also check for upper bounds of arrays
		var box = getSpaceBox(pos);
		if (!box) return false;
		if (box.GetType() == typeof (Block)){
			return true;
		}
		return false;
	}
	
	function CreateBlock(pos: Vector3){
		var b: Block = new Block(this);
		b.loadPos (pos);
		b.loadPrefab(prefabs[2]);
		if (grid[pos.x, pos.y, pos.z])
			GameObject.Destroy(grid[pos.x, pos.y, pos.z].prefab);
		grid[pos.x, pos.y, pos.z] = b;
	}
	
	function CreateTile(pos:Vector3){
		var t: Tile = new Tile(this);
		t.loadPos(pos);
		t.loadPrefab(prefabs[1]);
		grid[pos.x,pos.y,pos.z] = t;
	}
};