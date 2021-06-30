import { createApp } from 'vue';
import BottomBar from './components/mainScreen/BottomBar.vue';
import FeaturesScreen from './components/mainScreen/subScreens/FeaturesScreen.vue';
import CategoryView from './components/mainScreen/subScreens/features-screen/CategoryView.vue';
import TopBar from './components/mainScreen/TopBar.vue';
import App from './App.vue';

const app = createApp(App);
app.component('bottom-bar', BottomBar);
app.component('features-screen', FeaturesScreen);
app.component('top-bar', TopBar);
app.component('category-view', CategoryView);
app.mount('#app');
