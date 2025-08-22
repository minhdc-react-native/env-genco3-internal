import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { Text } from "react-native-paper";

interface IProgs { label: string; value?: string | null, style?: StyleProp<ViewStyle> }
export const Field = ({ label, value, style }: IProgs) => {
    return (
        <View style={[styles.field, style]}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{value}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    field: {
        marginBottom: 16,
        flex: 1
    },
    label: {
        fontSize: 14,
        color: "gray",
        marginBottom: 4,
    },
    value: {
        fontSize: 16,
        color: "#000",
    },
});