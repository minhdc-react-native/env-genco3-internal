import { EvilIcons, FontAwesome } from "@expo/vector-icons";
import BottomSheet, { BottomSheetBackdrop, BottomSheetFlatList } from "@gorhom/bottom-sheet";
import debounce from "lodash.debounce";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Keyboard, Pressable, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { ActivityIndicator, Divider, IconButton, Portal, Text, TextInput, useTheme } from "react-native-paper";
type IListProps = {
    label?: string;
    placeholder?: string;
    data: IDataBase[];
    value: string | number;
    disabled?: boolean;
    fDisplay?: { fId?: string, fValue?: string, field?: string };
    onChange: (item: IDataBase | null) => void;
    typeDisplay?: 'value' | 'both';
    fId?: string;
    fValue?: string;
    clean?: boolean; // nếu true thì có nút xóa
    rightIcon?: React.ReactNode; // nếu có thì hiển thị icon bên phải
    style?: StyleProp<ViewStyle>;
    loading?: boolean,
    isError?: boolean;
    notFistFilter?: boolean;
    checkSelected?: { isError: string, message: string, requiredKeys: string[] };
};

const ViewComponent: React.FC<IListProps> = ({
    label, placeholder, data, value, onChange, fDisplay, typeDisplay = "value", disabled = false,
    fId, fValue, clean = true, rightIcon, style, loading, isError, notFistFilter = true, checkSelected
}) => {
    fId = fId || 'id';
    fValue = fValue || 'value';

    const colors = useTheme().colors;
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['50%', '70%', '90%'], []);
    const [searchText, setSearchText] = useState('');
    const [itemSelected, setItemSelected] = useState<IDataBase | null>(data.find(item => item[fId] === value) || null);

    const debouncedSearch = useMemo(
        () =>
            debounce((txt: string) => {
                setSearchText(txt);
            }, 300),
        []
    );

    const filteredList = useMemo(() => {
        if (!searchText) return data;
        const _searchText = searchText.toLowerCase();
        return data.filter(item =>
            item[fId].toString().toLowerCase().includes(_searchText) ||
            item[fValue].toLowerCase().includes(_searchText)
        );
    }, [searchText, data, fId, fValue]);

    const openModalSelect = () => {
        if (disabled) return;
        Keyboard.dismiss();
        bottomSheetRef.current?.snapToIndex(2);
    }
    const getItemSelected = (item: IDataBase | null) => {
        bottomSheetRef.current?.close();
        onChange(item);
        if (itemSelected?.[fId] !== value) setItemSelected(item);
        // closeModal(() => { });
    }
    const closeModal = (callBack: () => void) => {
        setTimeout(() => {
            bottomSheetRef.current?.close();
            callBack();
        }, 100); // delay nhẹ
    }
    useEffect(() => {
        if (value) {
            const selectedItem = data.find(item => item[fId] === value);
            setItemSelected(selectedItem || null);
        } else {
            setItemSelected(null);
        }
    }, [value, data]);

    useEffect(() => {
        if (notFistFilter) return;
        setSearchText(value?.toString());
    }, []);
    return (
        <>
            <Pressable
                style={({ pressed }) => [styles.button, { opacity: pressed ? 0.7 : 1, borderColor: isError ? colors.error : colors.secondary, backgroundColor: disabled ? colors.elevation.level1 : colors.background }, style]}
                // pressStyle={{
                //     backgroundColor: colors.background, justifyContent: "space-between", flexDirection: "row", alignItems: "center",
                //     paddingVertical: 10, paddingHorizontal: 20, gap: 10, borderRadius: 6
                // }} 
                onPress={openModalSelect}>
                {loading ? <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}><ActivityIndicator
                    size={20}
                    color={colors.backdrop}
                /></View> : <View style={{ flex: 1 }}>
                    <Text variant="bodyLarge" numberOfLines={1} style={{ color: itemSelected ? "#000" : colors.backdrop, paddingLeft: 8 }}>{
                        itemSelected ? (fDisplay?.field ? (itemSelected[fDisplay.field] ?? '???') : (typeDisplay !== "both" ? (itemSelected[fDisplay?.fValue ||
                            fValue] ?? '???') : "".concat((itemSelected[fDisplay?.fId || fId] ?? '???'), " - ").concat((itemSelected[fDisplay?.fValue || fValue] ?? '???')))) :
                            (placeholder || label || `Chọn...`)
                    }</Text>
                </View>}
                {itemSelected && clean && !disabled ? (rightIcon || <Pressable
                    onPress={(event) => {
                        event.stopPropagation(); // Ngăn sự kiện lan lên cha
                        getItemSelected(null);
                    }}
                    style={{ right: -15 }}
                >
                    <IconButton icon="close-circle" size={15} iconColor={colors.primary} />
                </Pressable>) : <FontAwesome name="angle-down" size={20} color={colors.secondary} />}
                {value && label &&
                    <View style={styles.label}>
                        <View style={styles.label}>
                            <Text style={{ color: colors.inverseSurface, fontSize: 12.7 }}>{label}</Text>
                        </View>
                        {label && <Text style={{ color: disabled ? colors.elevation.level1 : colors.background, paddingHorizontal: 4 }}>{label}</Text>}
                        {label && <View style={[styles.line, { borderColor: colors.background }]} />}
                    </View>
                }
            </Pressable>
            <Portal>
                <BottomSheet
                    ref={bottomSheetRef}
                    index={-1} // đóng mặc định
                    snapPoints={snapPoints}
                    enablePanDownToClose
                    backdropComponent={(props) => (
                        <BottomSheetBackdrop
                            {...props}
                            disappearsOnIndex={-1}     // khi index = -1 (đóng) thì backdrop biến mất
                            appearsOnIndex={0}         // khi index >= 0 thì backdrop hiện ra
                            opacity={0.5}              // độ mờ
                        />
                    )}
                    enableContentPanningGesture={true}
                    keyboardBehavior="interactive"
                    keyboardBlurBehavior="restore"
                    containerStyle={{ marginTop: 60 }}
                >
                    <HeaderView setSearchText={debouncedSearch} txtSearch={notFistFilter ? '' : value?.toString()} label={label || placeholder} />
                    <BottomSheetFlatList
                        data={filteredList}
                        keyExtractor={(item: IDataBase) => item[fId].toString()}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, index }: { item: IDataBase, index: number }) => <ItemView item={item} onPress={getItemSelected}
                            isSelect={item[fId] === itemSelected?.[fId]} fId={fId} fValue={fValue} />}
                        ItemSeparatorComponent={() => <Divider />}
                        keyboardShouldPersistTaps="always"
                        ListFooterComponent={() => <View style={{ height: 50 }} />}
                        initialNumToRender={20}
                        maxToRenderPerBatch={20}
                        windowSize={10}
                    />
                </BottomSheet>
            </Portal>
        </>
    );
};
const VcSelectList = React.memo(ViewComponent);
export default VcSelectList;
type IProps = {
    item: IDataBase;
    onPress: (item: IDataBase) => void;
    isSelect?: boolean;
    fId: string;
    fValue: string;
};

const ItemViewComponent: React.FC<IProps> = ({
    item,
    onPress,
    isSelect,
    fId, fValue
}) => {
    const { colors } = useTheme();
    return (
        <Pressable onPress={() => {
            onPress(item);
        }} style={{
            paddingHorizontal: 10, flexDirection: "row",
            alignItems: "center", justifyContent: "space-between", backgroundColor: isSelect ? colors.elevation.level1 : "transparent"
        }}>
            <View style={{ paddingVertical: 10, paddingLeft: 10, paddingHorizontal: 10, flex: 1 }}>
                <Text>{`${item['name'] || item[fValue]}`}</Text>
            </View>
        </Pressable>
    );
};
const ItemView = React.memo(ItemViewComponent);

const HeaderView = ({ setSearchText, txtSearch, label }: {
    setSearchText: (value: string) => void;
    txtSearch?: string;
    label?: string;
}) => {
    label = label || 'Chọn'
    const [valueSearch, setValueSerach] = useState(txtSearch);
    const { colors } = useTheme();
    return (
        <View style={{ justifyContent: "center", flexDirection: "row", paddingLeft: 20, paddingRight: 10, gap: 5, alignItems: "center", borderBottomWidth: 0.4, paddingBottom: 10, borderBottomColor: colors.backdrop }}>
            <View style={{ maxWidth: "30%" }}>
                <Text variant="titleSmall" numberOfLines={1} style={{ alignSelf: "center", marginRight: 10 }}>{label}</Text>
            </View>
            <TextInput
                placeholder={'Tìm kiếm'}
                mode="outlined"
                left={<TextInput.Icon icon={() => <EvilIcons name="search" size={24} color={colors.secondary} />} />}
                right={valueSearch ? <TextInput.Icon icon={"close"} color={colors.primary} onPress={() => {
                    if (!valueSearch) return;
                    setValueSerach("");
                    setSearchText("");
                }} /> : undefined}

                value={valueSearch}
                onChangeText={(value) => {
                    setValueSerach(value);
                    setSearchText(value);
                }}
                outlineStyle={{ padding: 0, margin: 0, borderWidth: 0.5, borderRadius: 20, borderColor: colors.backdrop }}
                style={{ flex: 1, height: 40 }}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    button: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        borderRadius: 6,
        borderWidth: 0.5,
        height: 42
    },
    line: {
        position: "absolute",
        width: "100%",
        borderWidth: 1,
        top: 3,
        left: 2,
        zIndex: 1
    },
    label: {
        position: "absolute",
        fontSize: 12,
        top: -4,
        left: 8,
        zIndex: 2
    }
});