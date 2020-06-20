var numSocket = new Rete.Socket("Number");

var VueBControl = {
	props: ['emitter', 'ikey', 'cback', 'getData', 'putData'],
	template: '<div><input class="click_button" type="button" @click="plus($event)" value="+" />&nbsp;<input class="click_button" type="button" @click="minus($event)" value="-" /></div>',

	methods: {
		plus(e){ this.cback(1); this.update(); },	
		minus(e){ this.cback(0); this.update(); },	
		update() { this.emitter.trigger('process'); }
	},
};

class BControl extends Rete.Control {
	constructor(emitter, node, key, cback) {
		super(key);
		this.component = VueBControl;
		this.props = { emitter, ikey: key, cback:cback };
	}
}

var VueNumControl = {
	props: ['emitter', 'ikey', 'ph', 'dataValue', 'getData', 'putData'],
	template: '<input type="number" step="any" :placeholder="ph" :value="value" @input="change($event)" @dblclick.stop=""/>',

  data () { return { value: this.dataValue } },

  watch: {
    value: {
     immediate: true,
     handler(val) { this.value = this.dataValue },
     deep: true
    }
  },

    methods: {
		change(e) { this.value = +e.target.value; this.update(); },
		update() {
			if (this.ikey) this.putData(this.ikey, this.value);
      this.emitter.trigger('process');
		}
	},

 mounted() { 		
    if(this.ikey)
      this.value = this.getData(this.ikey);
  }
};

class NumControl extends Rete.Control {
	constructor(emitter, key, ph) {
		super(key);
		this.component = VueNumControl;
		this.props = { emitter, ikey: key, ph: ph, dataValue: 0};
	}
  	setValue(val) {
		this.props.dataValue = val;
	}
}

class FirstComponent extends Rete.Component {
	constructor() {	super('AddOutput'); }

	builder(node) {
    node.meta.letter = '`';

    async function callback(n) { 
      if(!n) { // del
        let o1 = this.emitter.nodes.find(n => n.id == node.id).outputs.get(node.meta.letter);
        let c1 = this.emitter.nodes.find(n => n.id == node.id).controls.get(node.meta.letter);
        if(c1 && o1) {
          node.removeControl(c1);
     			node.removeOutput(o1);
       	  delete(node.data[node.meta.letter]);
          await node.update();
          node.meta.letter = node.meta.letter.substring(0, node.meta.letter.length - 1) + String.fromCharCode(node.meta.letter.charCodeAt(node.meta.letter.length - 1) - 1);
       		setTimeout( () => { this.emitter.view.updateConnections({node}); }, 10);

      }
      } else { // add
        node.meta.letter = node.meta.letter.substring(0, node.meta.letter.length - 1) + String.fromCharCode(node.meta.letter.charCodeAt(node.meta.letter.length - 1) + 1);
            let out = new Rete.Output(node.meta.letter, 'Number '+node.meta.letter, numSocket);
            node.addOutput(out);
            node.addControl(new NumControl( this.emitter, node.meta.letter, 'Out '+node.meta.letter, 0)); 
          await node.update();
      		setTimeout( () => { this.emitter.view.updateConnections({node}); }, 10);

      }
    }

    let out = new Rete.Output('a', 'Number a', numSocket);
  
    return node
			      .addControl(new BControl(this.editor, node, 'button', callback))
//      			.addOutput(out)
//            .addControl(new NumControl(this.editor, 'a', 'Out '+node.meta.letter))
	}

  worker(node, inputs, outputs) {
    let ob = {}; 
    let a = 5;
   	Object.keys(node.outputs).forEach(function(key) {
        ob = this.editor.nodes.find(n => n.id == node.id).controls.get(key)
//        console.log(ob);
        ob.setValue(a++);
		},this);

  }
}

(async () => {
    var container = document.querySelector('#rete');
    var components = [new FirstComponent()];
    
    var editor = new Rete.NodeEditor('demo@0.1.0', container);
    editor.use(ConnectionPlugin.default);
    editor.use(VueRenderPlugin.default);    
    editor.use(ContextMenuPlugin.default);    
    editor.use(AreaPlugin);

    var engine = new Rete.Engine('demo@0.1.0');
    
    components.map(c => {
        editor.register(c);
        engine.register(c);
    });

  let nodes = {"id":"demo@0.1.0","nodes":{"1":{"id":1,"data":{},"inputs":{},"outputs":{"a":{"connections":[]}},"position":[101.60003662109375,176.1999969482422],"name":"AddOutput"}}};

  await editor.fromJSON(nodes);

  editor.on('process nodecreated noderemoved nodetranslated', async () => {
    await engine.abort();
    await engine.process(editor.toJSON());
    document.querySelector('#code').innerText = JSON.stringify(editor.toJSON());
    });

  editor.on('connectioncreated connectionremoved', async () => {
    _.debounce( async function() { await engine.abort(); }, 500);
    _.debounce( async function() { await engine.process(editor.toJSON()); }, 500);
    document.querySelector('#code').innerText = JSON.stringify(editor.toJSON());
    });
  
  editor.on('zoom', ({ source }) => {
	    return source !== 'dblclick';
	});

    editor.view.resize();
    AreaPlugin.zoomAt(editor);
    editor.trigger('process');
})();