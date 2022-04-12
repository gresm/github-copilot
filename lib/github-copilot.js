'use babel';

import GithubCopilotView from './github-copilot-view';
import { CompositeDisposable } from 'atom';

export default {

  githubCopilotView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.githubCopilotView = new GithubCopilotView(state.githubCopilotViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.githubCopilotView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'github-copilot:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.githubCopilotView.destroy();
  },

  serialize() {
    return {
      githubCopilotViewState: this.githubCopilotView.serialize()
    };
  },

  toggle() {
    console.log('GithubCopilot was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
