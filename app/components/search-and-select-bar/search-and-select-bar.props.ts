export interface SearchAndSelectBarProps {
    options: string[]
    selectedOptions: string[]
    toggleOption: Function
    hideSelectedOptions?: boolean
    onChangeSearchString?: (str: string) => void
}
