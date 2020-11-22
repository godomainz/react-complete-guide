import React ,{ Component } from "react";

const AsyncComponent = (importComponent:any) => {

    interface State {
        component:any;
    }
    return class extends Component{

        state:State = {
            component: null,
        }

        componentWillMount(){
            importComponent().then((cmp:any) => {
                this.setState({component : cmp.default});
            });
        }

        render(){
            const C = this.state.component;
            return C ? <C {...this.props} /> : null;
        }
    }

}

export default AsyncComponent;