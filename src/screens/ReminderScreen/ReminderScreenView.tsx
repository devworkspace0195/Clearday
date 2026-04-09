import React, { memo, useCallback } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  ListRenderItemInfo,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import DateTimePicker, { type DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
import { useReminderScreenViewModel } from './ReminderScreenViewModel';
import { reminderScreenStyles } from './ReminderScreenStyles';
import { STRINGS } from '../../constants';
import type { Reminder } from './ReminderScreenModel';

// ─── Reminder card ────────────────────────────────────────────────────────────
interface ReminderCardProps {
  reminder: Reminder;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  cardBackground: string;
  checkboxBorderColor: string;
  checkboxFillColor: string;
  titleColor: string;
  subtleColor: string;
  deleteBackground: string;
}

const ReminderCard: React.FC<ReminderCardProps> = memo(
  ({
    reminder,
    onToggle,
    onDelete,
    cardBackground,
    checkboxBorderColor,
    checkboxFillColor,
    titleColor,
    subtleColor,
    deleteBackground,
  }) => {
    const handleToggle = useCallback(() => onToggle(reminder.id), [onToggle, reminder.id]);
    const handleDelete = useCallback(() => onDelete(reminder.id), [onDelete, reminder.id]);

    const isPast = reminder.dateTime < Date.now() && !reminder.completed;

    return (
      <View style={[reminderScreenStyles.reminderCard, { backgroundColor: cardBackground }]}>
        <TouchableOpacity
          style={[
            reminderScreenStyles.checkbox,
            {
              borderColor: reminder.completed ? checkboxFillColor : checkboxBorderColor,
              backgroundColor: reminder.completed ? checkboxFillColor : 'transparent',
            },
          ]}
          onPress={handleToggle}
          accessibilityRole="checkbox"
          accessibilityState={{ checked: reminder.completed }}
          accessibilityLabel={STRINGS.REMINDER.A11Y_TOGGLE}
        >
          {reminder.completed ? (
            <Text style={reminderScreenStyles.checkmark}>{STRINGS.REMINDER.ICON_CHECKMARK}</Text>
          ) : null}
        </TouchableOpacity>

        <View style={reminderScreenStyles.reminderContent}>
          <Text
            style={[
              reminderScreenStyles.reminderTitle,
              { color: titleColor },
              reminder.completed && reminderScreenStyles.reminderTitleDone,
            ]}
            numberOfLines={1}
          >
            {reminder.title}
          </Text>
          <Text
            style={[
              reminderScreenStyles.reminderDateTime,
              { color: isPast ? '#EF4444' : subtleColor },
            ]}
          >
            {isPast ? '⚠️ ' : '🕐 '}
            {STRINGS.REMINDER.formatDateTime(reminder.dateTime)}
          </Text>
        </View>

        <TouchableOpacity
          style={[reminderScreenStyles.deleteButton, { backgroundColor: deleteBackground }]}
          onPress={handleDelete}
          accessibilityRole="button"
          accessibilityLabel={STRINGS.REMINDER.a11yDeleteReminder(reminder.title)}
        >
          <Text style={[reminderScreenStyles.deleteIcon, { color: subtleColor }]}>
            {STRINGS.REMINDER.ICON_REMOVE}
          </Text>
        </TouchableOpacity>
      </View>
    );
  },
);

ReminderCard.displayName = 'ReminderCard';

// ─── Empty state ──────────────────────────────────────────────────────────────
interface EmptyStateProps {
  searchQuery: string;
  textColor: string;
  subtleColor: string;
}

const EmptyState: React.FC<EmptyStateProps> = memo(({ searchQuery, textColor, subtleColor }) => {
  const emoji = searchQuery ? STRINGS.REMINDER.EMPTY_SEARCH_EMOJI : STRINGS.REMINDER.EMPTY_EMOJI;
  const title = searchQuery ? STRINGS.REMINDER.EMPTY_SEARCH_TITLE : STRINGS.REMINDER.EMPTY_TITLE;
  const sub = searchQuery
    ? STRINGS.REMINDER.emptySearchSubtitle(searchQuery)
    : STRINGS.REMINDER.EMPTY_SUBTITLE;

  return (
    <View style={reminderScreenStyles.emptyContainer}>
      <Text style={reminderScreenStyles.emptyEmoji}>{emoji}</Text>
      <Text style={[reminderScreenStyles.emptyTitle, { color: textColor }]}>{title}</Text>
      <Text style={[reminderScreenStyles.emptySubtitle, { color: subtleColor }]}>{sub}</Text>
    </View>
  );
});

EmptyState.displayName = 'EmptyState';

// ─── Compose sheet ────────────────────────────────────────────────────────────
interface ComposeSheetProps {
  titleDraft: string;
  dateDraft: Date;
  showDatePicker: boolean;
  showTimePicker: boolean;
  onChangeTitle: (text: string) => void;
  onOpenDate: () => void;
  onOpenTime: () => void;
  onClosePickers: () => void;
  onDateChange: (event: DateTimePickerEvent, date?: Date) => void;
  onTimeChange: (event: DateTimePickerEvent, date?: Date) => void;
  onSave: () => void;
  onCancel: () => void;
  cardBackground: string;
  handleColor: string;
  headingColor: string;
  inputBackground: string;
  inputColor: string;
  placeholderColor: string;
  pickerBackground: string;
  borderColor: string;
  primaryColor: string;
}

const ComposeSheet: React.FC<ComposeSheetProps> = memo(
  ({
    titleDraft,
    dateDraft,
    showDatePicker,
    showTimePicker,
    onChangeTitle,
    onOpenDate,
    onOpenTime,
    onClosePickers,
    onDateChange,
    onTimeChange,
    onSave,
    onCancel,
    cardBackground,
    handleColor,
    headingColor,
    inputBackground,
    inputColor,
    placeholderColor,
    pickerBackground,
    borderColor,
    primaryColor,
  }) => {
    const canSave = titleDraft.trim().length > 0;

    const dateLabel = dateDraft.toLocaleDateString(undefined, {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
    const timeLabel = dateDraft.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
    });

    return (
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={[reminderScreenStyles.composeCard, { backgroundColor: cardBackground }]}>
          <View style={[reminderScreenStyles.composeHandle, { backgroundColor: handleColor }]} />
          <Text style={[reminderScreenStyles.composeHeading, { color: headingColor }]}>
            {STRINGS.REMINDER.COMPOSE_HEADING_ADD}
          </Text>

          <TextInput
            style={[
              reminderScreenStyles.composeTitleInput,
              { backgroundColor: inputBackground, color: inputColor },
            ]}
            placeholder={STRINGS.REMINDER.ADD_TITLE_PLACEHOLDER}
            placeholderTextColor={placeholderColor}
            value={titleDraft}
            onChangeText={onChangeTitle}
            returnKeyType="done"
            accessibilityLabel={STRINGS.REMINDER.ADD_TITLE_PLACEHOLDER}
          />

          {/* Date / Time selector buttons */}
          <View style={reminderScreenStyles.pickerRow}>
            <TouchableOpacity
              style={[reminderScreenStyles.pickerButton, { backgroundColor: pickerBackground }]}
              onPress={showDatePicker ? onClosePickers : onOpenDate}
              accessibilityRole="button"
              accessibilityLabel={STRINGS.REMINDER.DATE_LABEL}
            >
              <Text style={[reminderScreenStyles.pickerLabel, { color: placeholderColor }]}>
                {STRINGS.REMINDER.DATE_LABEL}
              </Text>
              <Text style={[reminderScreenStyles.pickerValue, { color: headingColor }]}>
                {dateLabel}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[reminderScreenStyles.pickerButton, { backgroundColor: pickerBackground }]}
              onPress={showTimePicker ? onClosePickers : onOpenTime}
              accessibilityRole="button"
              accessibilityLabel={STRINGS.REMINDER.TIME_LABEL}
            >
              <Text style={[reminderScreenStyles.pickerLabel, { color: placeholderColor }]}>
                {STRINGS.REMINDER.TIME_LABEL}
              </Text>
              <Text style={[reminderScreenStyles.pickerValue, { color: headingColor }]}>
                {timeLabel}
              </Text>
            </TouchableOpacity>
          </View>

          {showDatePicker ? (
            <DateTimePicker
              value={dateDraft}
              mode="date"
              display={Platform.OS === 'ios' ? 'inline' : 'default'}
              minimumDate={new Date()}
              onChange={onDateChange}
              style={reminderScreenStyles.dateTimePicker}
            />
          ) : null}

          {showTimePicker ? (
            <DateTimePicker
              value={dateDraft}
              mode="time"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={onTimeChange}
              style={reminderScreenStyles.dateTimePicker}
            />
          ) : null}

          <View style={reminderScreenStyles.composeActions}>
            <TouchableOpacity
              style={[reminderScreenStyles.composeCancelButton, { borderColor }]}
              onPress={onCancel}
              accessibilityRole="button"
            >
              <Text style={[reminderScreenStyles.composeCancelText, { color: headingColor }]}>
                {STRINGS.REMINDER.CANCEL_BUTTON}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                reminderScreenStyles.composeSaveButton,
                { backgroundColor: canSave ? primaryColor : borderColor },
              ]}
              onPress={onSave}
              disabled={!canSave}
              accessibilityRole="button"
              accessibilityLabel={STRINGS.REMINDER.A11Y_ADD_REMINDER}
            >
              <Text style={reminderScreenStyles.composeSaveText}>
                {STRINGS.REMINDER.ADD_BUTTON}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  },
);

ComposeSheet.displayName = 'ComposeSheet';

// ─── Main screen ──────────────────────────────────────────────────────────────
const ReminderScreenView: React.FC = memo(() => {
  const { colors } = useTheme();
  const {
    filteredReminders,
    searchQuery,
    reminderCount,
    compose,
    setSearchQuery,
    openCompose,
    closeCompose,
    setTitleDraft,
    setDateDraft,
    openDatePicker,
    openTimePicker,
    closePickers,
    saveReminder,
    removeReminder,
    completeReminder,
    goBack,
  } = useReminderScreenViewModel();

  const handleGoBack = useCallback(() => goBack(), [goBack]);
  const handleClearSearch = useCallback(() => setSearchQuery(''), [setSearchQuery]);

  const handleDateChange = useCallback(
    (_event: DateTimePickerEvent, date?: Date) => {
      if (date) {
        setDateDraft((prev: Date) => {
          const merged = new Date(date);
          merged.setHours(prev.getHours(), prev.getMinutes(), 0, 0);
          return merged;
        });
      }
      closePickers();
    },
    [setDateDraft, closePickers],
  );

  const handleTimeChange = useCallback(
    (_event: DateTimePickerEvent, date?: Date) => {
      if (date) {
        setDateDraft((prev: Date) => {
          const merged = new Date(prev);
          merged.setHours(date.getHours(), date.getMinutes(), 0, 0);
          return merged;
        });
      }
      if (Platform.OS === 'android') { closePickers(); }
    },
    [setDateDraft, closePickers],
  );

  const handleSave = useCallback(() => { saveReminder(); }, [saveReminder]);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Reminder>) => (
      <ReminderCard
        reminder={item}
        onToggle={completeReminder}
        onDelete={removeReminder}
        cardBackground={colors.surface}
        checkboxBorderColor={colors.border}
        checkboxFillColor={colors.primary}
        titleColor={colors.textPrimary}
        subtleColor={colors.textSecondary}
        deleteBackground={colors.background}
      />
    ),
    [completeReminder, removeReminder, colors],
  );

  const keyExtractor = useCallback((item: Reminder) => item.id, []);

  const renderEmpty = useCallback(
    () => (
      <EmptyState
        searchQuery={searchQuery}
        textColor={colors.textPrimary}
        subtleColor={colors.textSecondary}
      />
    ),
    [searchQuery, colors],
  );

  return (
    <SafeAreaView style={[reminderScreenStyles.safeArea, { backgroundColor: colors.background }]}>
      {/* ── Header ── */}
      <View style={reminderScreenStyles.header}>
        <TouchableOpacity
          style={[reminderScreenStyles.backButton, { backgroundColor: colors.surface }]}
          onPress={handleGoBack}
          accessibilityRole="button"
          accessibilityLabel={STRINGS.REMINDER.A11Y_GO_BACK}
        >
          <Text style={[reminderScreenStyles.backIcon, { color: colors.textPrimary }]}>
            {STRINGS.REMINDER.BACK_ICON}
          </Text>
        </TouchableOpacity>

        <View style={reminderScreenStyles.headerTextGroup}>
          <Text style={[reminderScreenStyles.title, { color: colors.textPrimary }]}>
            {STRINGS.REMINDER.TITLE}
          </Text>
          <Text style={[reminderScreenStyles.subtitle, { color: colors.textSecondary }]}>
            {STRINGS.REMINDER.subtitle(reminderCount)}
          </Text>
        </View>

        <TouchableOpacity
          style={[reminderScreenStyles.addButton, { backgroundColor: colors.primary }]}
          onPress={openCompose}
          accessibilityRole="button"
          accessibilityLabel={STRINGS.REMINDER.A11Y_OPEN_COMPOSE}
        >
          <Text style={[reminderScreenStyles.addButtonIcon, { color: colors.white }]}>
            {STRINGS.REMINDER.ICON_ADD}
          </Text>
        </TouchableOpacity>
      </View>

      {/* ── Search ── */}
      <View style={[reminderScreenStyles.searchRow, { backgroundColor: colors.surface }]}>
        <Text style={reminderScreenStyles.searchIcon}>{STRINGS.REMINDER.ICON_SEARCH}</Text>
        <TextInput
          style={[reminderScreenStyles.searchInput, { color: colors.textPrimary }]}
          placeholder={STRINGS.REMINDER.SEARCH_PLACEHOLDER}
          placeholderTextColor={colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
          returnKeyType="search"
          accessibilityLabel={STRINGS.REMINDER.A11Y_SEARCH}
        />
        {searchQuery.length > 0 ? (
          <TouchableOpacity
            onPress={handleClearSearch}
            accessibilityLabel={STRINGS.REMINDER.A11Y_SEARCH_CLEAR}
          >
            <Text style={[reminderScreenStyles.searchClear, { color: colors.textSecondary }]}>
              {STRINGS.REMINDER.ICON_REMOVE}
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>

      {/* ── Reminder list ── */}
      <FlatList
        data={filteredReminders}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={reminderScreenStyles.listContent}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews
        keyboardShouldPersistTaps="handled"
      />

      {/* ── Compose overlay ── */}
      {compose.isOpen ? (
        <View style={reminderScreenStyles.overlay}>
          <TouchableWithoutFeedback onPress={closeCompose}>
            <View style={reminderScreenStyles.overlayBackdrop} />
          </TouchableWithoutFeedback>
          <ComposeSheet
            titleDraft={compose.titleDraft}
            dateDraft={compose.dateDraft}
            showDatePicker={compose.showDatePicker}
            showTimePicker={compose.showTimePicker}
            onChangeTitle={setTitleDraft}
            onOpenDate={openDatePicker}
            onOpenTime={openTimePicker}
            onClosePickers={closePickers}
            onDateChange={handleDateChange}
            onTimeChange={handleTimeChange}
            onSave={handleSave}
            onCancel={closeCompose}
            cardBackground={colors.surface}
            handleColor={colors.border}
            headingColor={colors.textPrimary}
            inputBackground={colors.background}
            inputColor={colors.textPrimary}
            placeholderColor={colors.textSecondary}
            pickerBackground={colors.background}
            borderColor={colors.border}
            primaryColor={colors.primary}
          />
        </View>
      ) : null}
    </SafeAreaView>
  );
});

ReminderScreenView.displayName = 'ReminderScreenView';

export default ReminderScreenView;
