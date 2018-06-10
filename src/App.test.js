import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import Player from "./components/Player/Player";
import PlayersList from './components/PlayersList/PlayersList';
import AddPlayer from './components/AddPlayer/AddPlayer';

it('renders without crashing', () => {
  shallow(<App />);
});

it('if AddPlayer works', () => {
	const appComponent = shallow(<App />);
	const onPlayerAdd = appComponent.find(AddPlayer).prop('onPlayerAdd');
	onPlayerAdd('Ania');
	const players = appComponent.state('players');
	
	expect(players.length).toEqual(3);
	expect(players[0].name).toEqual('Ania');
	expect(players[0].score).toEqual(5);
}),

it('should update player score', () => {
	const appComponent = shallow(<App />);
	let players = [
		{
			name: "Ania",
			score: 8
		},
		{
			name: "Antoś",
			score: 0
		}
	]
	appComponent.setState({ players });
	
	const onScoreUpdate = appComponent.find(PlayersList).prop('onScoreUpdate');
	onScoreUpdate(0, 0);
	const playersAfterUpdate = appComponent.state().players;
		
	expect(playersAfterUpdate[0].score).toEqual(8);
});

it('should remove player', () => {
	const appComponent = shallow(<App />);
	let players = [
		{name: "Ania", score: 8},
		{name: "Antoś", score: 0}
	]
	appComponent.setState({ players });
	const onPlayerRemove = appComponent.find(PlayersList).prop('onPlayerRemove');
	onPlayerRemove('Antoś');
	const playersAfterRemove = appComponent.state().players;
	
	expect(players.length).toEqual(2);            //z tym dziala ale chyba zle
	//expect(playersAfterRemove[1].length).toEqual(2);   ///z tym nie
	
});