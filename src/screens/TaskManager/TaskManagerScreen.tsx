import React, { useEffect, useState } from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  SafeAreaView,
  FlatList,
  TextInput,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Brand } from '../../components';
import { useTheme } from '../../hooks';
import { useLazyFetchOneQuery } from '../../services/modules/users';
import { changeTheme, ThemeState } from '../../store/theme';
import i18next from 'i18next';
import { Colors } from '@/theme/Variables';

import {
  addTaskManager,
  updateTaskManager,
  removeTaskManager,
} from '../../store/task';
import { TaskState } from '../../store/task';

const TaskManagerScreen = () => {
  const { t } = useTranslation(['example', 'welcome']);
  const {
    Common,
    Fonts,
    Gutters,
    Layout,
    Images,
    darkMode: isDark,
  } = useTheme();
  const dispatch = useDispatch();
  const taskManager = useSelector(
    (state: { task: TaskState }) => state.task.taskManager,
  );
  const count = useSelector((state: { task: TaskState }) => state.task.count);
  const [isVisibleTaskManager, setVisibleTaskManager] =
    useState<boolean>(false);

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const [fetchOne, { data, isSuccess, isLoading, isFetching }] =
    useLazyFetchOneQuery();

  useEffect(() => {
    if (taskManager == null) {
      dispatch(addTaskManager([{ id: '0', name: 'Sample Task Manager' }]));
    }
    console.log('test --> ', JSON.stringify(taskManager));
  }, [taskManager]);

  useEffect(() => {
    if (isSuccess && data?.name) {
      Alert.alert(t('example:helloUser', { name: data.name }));
    }
  }, [isSuccess, data]);

  const onChangeTheme = ({ theme, darkMode }: Partial<ThemeState>) => {
    dispatch(changeTheme({ theme, darkMode }));
  };

  const onChangeLanguage = (lang: 'fr' | 'en') => {
    i18next.changeLanguage(lang);
  };

  return (
    <SafeAreaView style={Layout.fill}>
      {/* <View
        style={[
          Layout.fill,
          Layout.relative,
          Layout.fullWidth,
          Layout.justifyContentCenter,
          Layout.alignItemsCenter,
        ]}
      >
        <View
          style={[
            Layout.absolute,
            {
              height: 250,
              width: 250,
              backgroundColor: isDark ? '#000000' : '#DFDFDF',
              borderRadius: 140,
            },
          ]}
        />
        <Image
          style={[
            Layout.absolute,
            {
              bottom: '-30%',
              left: 0,
            },
          ]}
          source={Images.sparkles.bottomLeft}
          resizeMode={'contain'}
        />
        <View
          style={[
            Layout.absolute,
            {
              height: 300,
              width: 300,
              transform: [{ translateY: 40 }],
            },
          ]}
        >
          <Brand height={300} width={300} />
        </View>
        <Image
          style={[
            Layout.absolute,
            Layout.fill,
            {
              top: 0,
              left: 0,
            },
          ]}
          source={Images.sparkles.topLeft}
          resizeMode={'contain'}
        />
        <Image
          style={[
            Layout.absolute,
            {
              top: '-5%',
              right: 0,
            },
          ]}
          source={Images.sparkles.top}
          resizeMode={'contain'}
        />
        <Image
          style={[
            Layout.absolute,
            {
              top: '15%',
              right: 20,
            },
          ]}
          source={Images.sparkles.topRight}
          resizeMode={'contain'}
        />
        <Image
          style={[
            Layout.absolute,
            {
              bottom: '-10%',
              right: 0,
            },
          ]}
          source={Images.sparkles.right}
          resizeMode={'contain'}
        />

        <Image
          style={[
            Layout.absolute,
            {
              top: '75%',
              right: 0,
            },
          ]}
          source={Images.sparkles.bottom}
          resizeMode={'contain'}
        />
        <Image
          style={[
            Layout.absolute,
            {
              top: '60%',
              right: 0,
            },
          ]}
          source={Images.sparkles.bottomRight}
          resizeMode={'contain'}
        />
      </View>
      <View
        style={[
          Layout.fill,
          Layout.justifyContentBetween,
          Layout.alignItemsStart,
          Layout.fullWidth,
          Gutters.regularHPadding,
        ]}
      >
        <View>
          <Text style={[Fonts.titleRegular]}>{t('welcome:title')}</Text>
          <Text
            style={[Fonts.textBold, Fonts.textRegular, Gutters.regularBMargin]}
          >
            {t('welcome:subtitle')}
          </Text>
          <Text style={[Fonts.textSmall, Fonts.textLight]}>
            {t('welcome:description')}
          </Text>
        </View>

        <View
          style={[
            Layout.row,
            Layout.justifyContentBetween,
            Layout.fullWidth,
            Gutters.smallTMargin,
          ]}
        >
          <TouchableOpacity
            style={[Common.button.circle, Gutters.regularBMargin]}
            onPress={() => fetchOne(`${Math.ceil(Math.random() * 10 + 1)}`)}
          >
            {isFetching || isLoading ? (
              <ActivityIndicator />
            ) : (
              <Image
                source={Images.icons.send}
                style={{ tintColor: isDark ? '#A6A4F0' : '#44427D' }}
              />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[Common.button.circle, Gutters.regularBMargin]}
            onPress={() => onChangeTheme({ darkMode: !isDark })}
          >
            <Image
              source={Images.icons.colors}
              style={{ tintColor: isDark ? '#A6A4F0' : '#44427D' }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[Common.button.circle, Gutters.regularBMargin]}
            onPress={() =>
              onChangeLanguage(i18next.language === 'fr' ? 'en' : 'fr')
            }
          >
            <Image
              source={Images.icons.translate}
              style={{ tintColor: isDark ? '#A6A4F0' : '#44427D' }}
            />
          </TouchableOpacity>
        </View>
      </View> */}

      <View
        style={{
          flex: 1,
          justifyContent: !isVisibleTaskManager ? 'center' : 'flex-start',
          alignItems: 'center',
          paddingHorizontal: 20,
        }}
      >
        <Text style={[Fonts.textBold, Fonts.textRegular, { marginBottom: 20 }]}>
          {'TASK MANAGER '}
        </Text>

        {!isVisibleTaskManager && (
          <FlatList
            style={{ width: '100%', alignSelf: 'flex-start' }}
            data={taskManager}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item, index }) => {
              return (
                <View
                  style={{
                    padding: 20,
                    backgroundColor: Colors.circleButtonBackground,
                    marginBottom: 10,
                    borderRadius: 10,
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <View>
                      <Text
                        style={[
                          Fonts.textBold,
                          { fontSize: 20, color: Colors.circleButtonColor },
                        ]}
                      >
                        {item.name}
                      </Text>
                      <Text style={{ fontSize: 16 }}>{item.desc}</Text>
                    </View>

                    <TouchableOpacity
                      onPress={() => {
                        dispatch(removeTaskManager(index));
                      }}
                    >
                      <Text
                        style={[
                          Fonts.textRegular,
                          { fontSize: 14, color: Colors.circleButtonColor },
                        ]}
                      >
                        {'delete'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
            ListEmptyComponent={() => {
              return (
                <>
                  {!isVisibleTaskManager && (
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Image
                        source={{
                          uri: 'https://cdn.icon-icons.com/icons2/2483/PNG/512/empty_data_icon_149938.png',
                        }}
                        style={{ width: 200, height: 200 }}
                        resizeMode={'contain'}
                      />
                      <Text style={{ color: '#666' }}>{'Data is empty'}</Text>
                    </View>
                  )}
                </>
              );
            }}
          />
        )}
      </View>

      {isVisibleTaskManager && (
        <View style={{ position: 'absolute', top: 100, left: 50, right: 50 }}>
          <TextInput
            placeholder="Name"
            style={{
              width: '100%',
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 10,
              padding: 14,
              paddingLeft: 20,
            }}
            onChangeText={value => setTitle(value)}
            value={title}
          />

          <TextInput
            placeholder="Description"
            style={{
              width: '100%',
              marginTop: 10,
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 10,
              padding: 14,
              paddingLeft: 20,
            }}
            onChangeText={value => setDescription(value)}
            value={description}
          />

          <TouchableOpacity
            onPress={() => {
              if (title.length > 0 && description.length > 0) {
                dispatch(
                  addTaskManager({
                    id: count + 1,
                    name: title,
                    desc: description,
                  }),
                );
                setTitle('');
                setDescription('');
                
                setVisibleTaskManager(!isVisibleTaskManager);
              } else {
                Alert.alert('Silahkan lengkapi form nama dan description');
              }
            }}
            style={[
              {
                alignItems: 'center',
                marginTop: 20,
                justifyContent: 'center',
                alignSelf: 'center',
                borderRadius: 10,
                backgroundColor: Colors.primary,
                padding: 10,
                paddingHorizontal: 110,
              },
            ]}
          >
            <Text
              style={[
                Fonts.textBold,
                Fonts.textRegular,
                { color: Colors.white },
              ]}
            >
              {'Submit'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setVisibleTaskManager(!isVisibleTaskManager);
            }}
            style={[
              {
                alignItems: 'center',
                marginTop: 10,
                justifyContent: 'center',
                alignSelf: 'center',
                borderRadius: 10,
                backgroundColor: Colors.circleButtonColor,
                padding: 10,
                paddingHorizontal: 110,
              },
            ]}
          >
            <Text
              style={[
                Fonts.textBold,
                Fonts.textRegular,
                { color: Colors.white },
              ]}
            >
              {'Cancel'}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {!isVisibleTaskManager && (
        <TouchableOpacity
          onPress={() => {
            setVisibleTaskManager(!isVisibleTaskManager);
          }}
          style={[
            {
              alignItems: 'center',
              position: 'absolute',
              bottom: 30,
              left: 50,
              right: 50,
              alignSelf: 'baseline',
              borderRadius: 20,
              backgroundColor: Colors.primary,
              padding: 10,
              paddingHorizontal: 30,
            },
          ]}
        >
          <Text
            style={[Fonts.textBold, Fonts.textRegular, { color: Colors.white }]}
          >
            {'Create New Task'}
          </Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default TaskManagerScreen;
