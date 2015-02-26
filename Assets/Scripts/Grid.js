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
		return grid[pos.x,pos.y,pos.z];
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