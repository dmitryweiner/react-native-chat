import React, {Component} from 'react';
import {View, StyleSheet, GestureResponderEvent} from 'react-native';
import {
  Icon,
  Layout,
  MenuItem,
  OverflowMenu,
  TopNavigation,
  TopNavigationAction
} from '@ui-kitten/components';
import {NavigationActions} from 'react-navigation';

type ScreenWithNavigationProps = {
  children: JSX.Element;
  title: string;
  subtitle?: string;
  backHandler: any;
};

const BackIcon = (props: any) => <Icon {...props} name="arrow-back" />;

const EditIcon = (props: any) => <Icon {...props} name="edit" />;

const MenuIcon = (props: any) => <Icon {...props} name="more-vertical" />;

const InfoIcon = (props: any) => <Icon {...props} name="info" />;

const LogoutIcon = (props: any) => <Icon {...props} name="log-out" />;

const ScreenWithNavigation: React.FC<ScreenWithNavigationProps> = (
  props: ScreenWithNavigationProps
) => {
  const [menuVisible, setMenuVisible] = React.useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const renderMenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={toggleMenu} />
  );

  const renderRightActions = () => (
    <React.Fragment>
      <TopNavigationAction icon={EditIcon} />
      <OverflowMenu
        anchor={renderMenuAction}
        visible={menuVisible}
        onBackdropPress={toggleMenu}>
        <MenuItem accessoryLeft={InfoIcon} title="About" />
        <MenuItem accessoryLeft={LogoutIcon} title="Logout" />
      </OverflowMenu>
    </React.Fragment>
  );

  const renderBackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={props.backHandler} />
  );

  return (
    <Layout style={styles.container} level="1">
      <TopNavigation
        alignment="center"
        title={props.title}
        subtitle={props.subtitle}
        accessoryLeft={renderBackAction}
        accessoryRight={renderRightActions}
      />
      {props.children}
    </Layout>
  );
};

ScreenWithNavigation.defaultProps = {
  title: '',
  subtitle: ''
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default ScreenWithNavigation;
