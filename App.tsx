import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';
import { Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navigation from './src/navigations';
import { BLACK, PINK } from './src/styles/colors';
import globalStyles from './src/styles/globalStyles';
import 'react-native-gesture-handler';

const queryClient = new QueryClient();

const App = () => {
	const [isConnected, setIsConnected] = useState(false);

	useEffect(() => {
		const unsubscribe = NetInfo.addEventListener((state) => {
			if (state.isConnected) {
				console.log('Network is available');
				setIsConnected(true);
			} else {
				console.log('No network connection');
				setIsConnected(false);
			}
		});

		return () => {
			unsubscribe();
		};
	}, []);
	return (
		<>
			{!isConnected && (
				<View
					style={[
						globalStyles.horizontalDefaultPadding,
						globalStyles.verticalDefaultPadding,
						globalStyles.justifyCenter,
						globalStyles.alignCenter,
						globalStyles.row,
						globalStyles.columnGap,
						{ backgroundColor: PINK },
					]}>
					<Ionicons name='cloud-offline-outline' size={24} />
					<Text style={[{ color: BLACK }]}>No network connection</Text>
				</View>
			)}

			<QueryClientProvider client={queryClient}>
				<NavigationContainer>
					<Navigation />
				</NavigationContainer>
			</QueryClientProvider>
		</>
	);
};

export default App;
