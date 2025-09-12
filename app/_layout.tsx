import { GestureHandlerRootView } from "react-native-gesture-handler";
import {Slot, Stack }from "expo-router"

export default function layout(){
    return(
        <GestureHandlerRootView>
            <Stack screenOptions={{
                headerShown:false
            }}/>
            </GestureHandlerRootView>
    )
}