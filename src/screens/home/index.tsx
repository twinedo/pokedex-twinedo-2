import { StatusBar, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { BaseContainer } from '../../components/layout';
import { Input, Spacer, Toolbar } from '../../components/basic';
import { BLACK, GREY1, WHITE } from '../../styles/colors';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { NavParam } from '../../navigations/types';
import globalStyles from '../../styles/globalStyles';
import { useForm, Controller } from 'react-hook-form';

const Home = () => {
	const navigation = useNavigation<StackNavigationProp<NavParam, 'Home'>>();
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			search: '',
		},
	});
	const onSubmit = (data: { search: string }) => console.log(data);

	return (
		<BaseContainer>
			<StatusBar backgroundColor={WHITE} barStyle='dark-content' />
			<Toolbar
				containerStyle={{ borderBottomWidth: 0.5, borderBottomColor: GREY1 }}
				textStyle={{ fontWeight: 'bold', fontSize: 20 }}
				postfix={
					<AntDesign
						name='hearto'
						size={24}
						color={BLACK}
						onPress={() => navigation.navigate('Favorite')}
					/>
				}>
				Pokedex
			</Toolbar>
			<View
				style={[
					globalStyles.displayFlex,
					globalStyles.horizontalDefaultPadding,
					globalStyles.verticalDefaultPadding,
					{ backgroundColor: WHITE },
				]}>
				<Controller
					control={control}
					rules={{
						required: false,
					}}
					render={({ field: { onChange, onBlur, value } }) => (
						<Input
							placeholder='Search by name...'
							onBlur={onBlur}
							onChangeText={onChange}
							onEndEditing={handleSubmit(onSubmit)}
							value={value}
							containerStyle={{ borderRadius: 12 }}
						/>
					)}
					name='search'
				/>
				{errors.search && (
					<Text style={{ color: BLACK }}>This is required.</Text>
				)}
				<Spacer height={16} />

				<Text>Home</Text>
			</View>
		</BaseContainer>
	);
};

export default Home;

const styles = StyleSheet.create({});
