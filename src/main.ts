import { mount } from 'svelte'
import './app.css'
import App from './App.svelte'
import {getWebXPanel, runsInContainerApp} from '@crestron/ch5-webxpanel'

const { isActive, WebXPanel, WebXPanelConfigParams } = getWebXPanel(!runsInContainerApp());
const config: Partial<typeof WebXPanelConfigParams> = {
  host: "192.168.2.151",
  ipId: "0x04",
  roomId: "",
  authToken: ""
};
if (isActive) {
  WebXPanel.initialize(config);
}

const app = mount(App, {
  target: document.getElementById('app')!,
})

export default app
