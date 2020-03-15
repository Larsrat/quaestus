"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
var Task_1 = require("./components/Task");
function App() {
    return (<react_native_1.View style={styles.container}>
      <Task_1["default"] title={3}/>
      <Task_1["default"] title="Programmeringsuppgift"/>
    </react_native_1.View>);
}
exports["default"] = App;
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flexDirection: "row",
        padding: 20
    }
});
