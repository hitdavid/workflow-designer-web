/**
 * Define ToolBar For ProcessDesigner
 *
 * @author RanJi (����Ҳ����)
 * @date 2014-12-09
 */
 com.chanjet.gzq.aflowToolBar = Class.extend({
	toolBarName: 'com.chanjet.gzq.aflowToolBar',
	/**
	 * view: ��������Ҫ�����Ļ���
	 */
	init: function(view){
		this.view = view;
		
		this.editMenu = $('#edit-menu');
		this.undoMenuItem = $('#undoButton');
		this.redoMenuItem = $('#redoButton');
		
		view.getCommandStack().addEventListener(this);
		
		this.undoMenuItem.click($.proxy(function(){
			this.view.getCommandStack().undo();
			
		},this));
		this.redoMenuItem.click($.proxy(function(){
			this.view.getCommandStack().redo();
		},this));
		
	},

	stackChanged: function(event){
		 this.disableMenuItem(this.undoMenuItem, !event.getStack().canUndo());
		 this.disableMenuItem(this.redoMenuItem, !event.getStack().canRedo());
	},
	
	disableMenuItem: function(menuItem,flag){
		if(flag){
			this.editMenu.menu('disableItem',menuItem);
		}else{
			this.editMenu.menu('enableItem',menuItem);
		}
	}
 });