import React from 'react';
import {
	KeyboardAvoidingView,
	Platform,
	ScrollViewProps,
	ViewProps,
	ViewStyle,
	StyleSheet,
} from 'react-native';

import ScrollableContainer from './ScrollableContainer';
import globalStyles from '../../../styles/globalStyles';
import { SafeAreaView } from 'react-native-safe-area-context';

type IBaseContainerProps = {
	scrollable?: boolean;
	scrollProps?: ScrollViewProps;
	keyboardAvoidingViewBehaviour?: 'padding' | 'height' | 'position';
	containerStyle?: ViewStyle | ViewStyle[];
} & ViewProps;

const BaseContainer = (props: IBaseContainerProps) => {
	const {
		scrollable,
		scrollProps,
		children,
		containerStyle,
		keyboardAvoidingViewBehaviour,
	} = props;
	if (scrollable) {
		return (
			<ScrollableContainer
				{...scrollProps}
				keyboardAvoidingViewBehaviour={
					keyboardAvoidingViewBehaviour ?? Platform.OS === 'ios'
						? 'padding'
						: undefined
				}>
				{children}
			</ScrollableContainer>
		);
	}

	return (
		<SafeAreaView
			style={[globalStyles.container, containerStyle, styles.contain]}>
			<KeyboardAvoidingView
				style={[globalStyles.displayFlex]}
				behavior={
					keyboardAvoidingViewBehaviour ?? Platform.OS === 'ios'
						? 'padding'
						: undefined
				}>
				{children}
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	contain: {
		paddingTop: 0,
		backgroundColor: 'transparent',
	},
});

export default BaseContainer;
