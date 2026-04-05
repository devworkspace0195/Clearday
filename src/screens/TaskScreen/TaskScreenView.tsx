import React, { memo, useCallback } from 'react';
import {
  FlatList,
  Image,
  ListRenderItemInfo,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DateTimePicker, { type DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
import { useTaskScreenViewModel } from './TaskScreenViewModel';
import { taskScreenStyles } from './TaskScreenStyles';
import { formatDueDate, todayStart } from '../../utils/dateUtils';
import { STRINGS } from '../../constants';
import { FILTER_TABS, type Task, type TaskFilter } from './TaskScreenModel';

// ─── Task list item ───────────────────────────────────────────────────────────
interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  borderColor: string;
  checkboxBorderColor: string;
  checkboxFillColor: string;
  textColor: string;
  subtleColor: string;
  deleteBackground: string;
}

const TaskItem: React.FC<TaskItemProps> = memo(
  ({
    task,
    onToggle,
    onDelete,
    borderColor,
    checkboxBorderColor,
    checkboxFillColor,
    textColor,
    subtleColor,
    deleteBackground,
  }) => {
    const handleToggle = useCallback(() => onToggle(task.id), [onToggle, task.id]);
    const handleDelete = useCallback(() => onDelete(task.id), [onDelete, task.id]);

    return (
      <View>
        <View style={taskScreenStyles.taskItem}>
          <TouchableOpacity
            onPress={handleToggle}
            style={[
              taskScreenStyles.checkbox,
              {
                borderColor: task.completed ? checkboxFillColor : checkboxBorderColor,
                backgroundColor: task.completed ? checkboxFillColor : 'transparent',
              },
            ]}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: task.completed }}
            accessibilityLabel={task.title}
          >
            {task.completed ? (
              <Text style={[taskScreenStyles.checkmark, { color: '#fff' }]}>
                {STRINGS.TASK.ICON_CHECKMARK}
              </Text>
            ) : null}
          </TouchableOpacity>

          <View style={taskScreenStyles.taskTextGroup}>
            <Text
              style={[
                taskScreenStyles.taskTitle,
                { color: textColor },
                task.completed && taskScreenStyles.taskTitleDone,
              ]}
              numberOfLines={2}
            >
              {task.title}
            </Text>
            {task.dueDate ? (
              <Text style={[taskScreenStyles.taskDueDate, { color: subtleColor }]}>
                {STRINGS.TASK.ICON_DATE} {formatDueDate(task.dueDate)}
              </Text>
            ) : null}
            {task.imageUri ? (
              <Image
                source={{ uri: task.imageUri }}
                style={taskScreenStyles.taskThumbnail}
                resizeMode="cover"
              />
            ) : null}
          </View>

          <TouchableOpacity
            onPress={handleDelete}
            style={[taskScreenStyles.deleteButton, { backgroundColor: deleteBackground }]}
            accessibilityRole="button"
            accessibilityLabel={STRINGS.TASK.a11yDeleteTask(task.title)}
          >
            <Text style={[taskScreenStyles.deleteIcon, { color: subtleColor }]}>
              {STRINGS.TASK.ICON_REMOVE}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[taskScreenStyles.taskItemDivider, { backgroundColor: borderColor }]} />
      </View>
    );
  },
);

TaskItem.displayName = 'TaskItem';

// ─── Empty state ──────────────────────────────────────────────────────────────
interface EmptyStateProps {
  activeFilter: TaskFilter;
  searchQuery: string;
  textColor: string;
  subtleColor: string;
}

const EmptyState: React.FC<EmptyStateProps> = memo(
  ({ activeFilter, searchQuery, textColor, subtleColor }) => {
    const emoji = searchQuery
      ? STRINGS.TASK.EMPTY_SEARCH_EMOJI
      : activeFilter === 'completed'
        ? STRINGS.TASK.EMPTY_COMPLETED_EMOJI
        : STRINGS.TASK.EMPTY_DEFAULT_EMOJI;
    const title = searchQuery
      ? STRINGS.TASK.EMPTY_SEARCH_TITLE
      : activeFilter === 'completed'
        ? STRINGS.TASK.EMPTY_COMPLETED_TITLE
        : STRINGS.TASK.EMPTY_DEFAULT_TITLE;
    const subtitle = searchQuery
      ? STRINGS.TASK.emptySearchSubtitle(searchQuery)
      : activeFilter === 'completed'
        ? STRINGS.TASK.EMPTY_COMPLETED_SUBTITLE
        : STRINGS.TASK.EMPTY_DEFAULT_SUBTITLE;

    return (
      <View style={taskScreenStyles.emptyContainer}>
        <Text style={taskScreenStyles.emptyEmoji}>{emoji}</Text>
        <Text style={[taskScreenStyles.emptyTitle, { color: textColor }]}>{title}</Text>
        <Text style={[taskScreenStyles.emptySubtitle, { color: subtleColor }]}>
          {subtitle}
        </Text>
      </View>
    );
  },
);

EmptyState.displayName = 'EmptyState';

// ─── Main screen ──────────────────────────────────────────────────────────────
const TaskScreenView: React.FC = memo(() => {
  const { colors } = useTheme();
  const {
    filteredTasks,
    searchQuery,
    activeFilter,
    newTaskTitle,
    pendingImageUri,
    selectedDate,
    showDatePicker,
    activeCount,
    completedCount,
    setSearchQuery,
    setActiveFilter,
    setNewTaskTitle,
    addTask,
    toggleTask,
    deleteTask,
    pickFromGallery,
    takePhoto,
    removePendingImage,
    toggleDatePicker,
    clearDate,
    onDateChange,
    goBack,
  } = useTaskScreenViewModel();

  const handleGoBack = useCallback(() => goBack(), [goBack]);
  const handleAddTask = useCallback(() => addTask(), [addTask]);
  const handleClearSearch = useCallback(() => setSearchQuery(''), [setSearchQuery]);
  const handleDateChange = useCallback(
    (event: DateTimePickerEvent, date?: Date) => onDateChange(event, date),
    [onDateChange],
  );

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Task>) => (
      <TaskItem
        task={item}
        onToggle={toggleTask}
        onDelete={deleteTask}
        borderColor={colors.border}
        checkboxBorderColor={colors.border}
        checkboxFillColor={colors.primary}
        textColor={colors.textPrimary}
        subtleColor={colors.textSecondary}
        deleteBackground={colors.surface}
      />
    ),
    [toggleTask, deleteTask, colors],
  );

  const keyExtractor = useCallback((item: Task) => item.id, []);

  const renderEmpty = useCallback(
    () => (
      <EmptyState
        activeFilter={activeFilter}
        searchQuery={searchQuery}
        textColor={colors.textPrimary}
        subtleColor={colors.textSecondary}
      />
    ),
    [activeFilter, searchQuery, colors],
  );

  return (
    <SafeAreaView
      style={[taskScreenStyles.safeArea, { backgroundColor: colors.background }]}
    >
      {/* ── Header ── */}
      <View style={taskScreenStyles.header}>
        <TouchableOpacity
          style={[taskScreenStyles.backButton, { backgroundColor: colors.surface }]}
          onPress={handleGoBack}
          accessibilityRole="button"
          accessibilityLabel={STRINGS.TASK.A11Y_GO_BACK}
        >
          <Text style={taskScreenStyles.backIcon}>{STRINGS.TASK.BACK_ICON}</Text>
        </TouchableOpacity>
        <View style={taskScreenStyles.headerTextGroup}>
          <Text style={[taskScreenStyles.title, { color: colors.textPrimary }]}>
            {STRINGS.TASK.TITLE}
          </Text>
          <Text style={[taskScreenStyles.subtitle, { color: colors.textSecondary }]}>
            {STRINGS.TASK.subtitle(activeCount, completedCount)}
          </Text>
        </View>
      </View>

      {/* ── Search bar ── */}
      <View
        style={[taskScreenStyles.searchRow, { backgroundColor: colors.surface }]}
      >
        <Text style={taskScreenStyles.searchIcon}>{STRINGS.TASK.ICON_SEARCH}</Text>
        <TextInput
          style={[taskScreenStyles.searchInput, { color: colors.textPrimary }]}
          placeholder={STRINGS.TASK.SEARCH_PLACEHOLDER}
          placeholderTextColor={colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
          returnKeyType="search"
          accessibilityLabel={STRINGS.TASK.A11Y_SEARCH}
        />
        {searchQuery.length > 0 ? (
          <TouchableOpacity
            onPress={handleClearSearch}
            accessibilityLabel={STRINGS.TASK.A11Y_SEARCH_CLEAR}
          >
            <Text style={[taskScreenStyles.searchClear, { color: colors.textSecondary }]}>
              {STRINGS.TASK.ICON_REMOVE}
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>

      {/* ── Filter tabs ── */}
      <View
        style={[taskScreenStyles.filterRow, { backgroundColor: colors.surface }]}
      >
        {FILTER_TABS.map(tab => {
          const isActive = activeFilter === tab.value;
          return (
            <TouchableOpacity
              key={tab.value}
              style={[
                taskScreenStyles.filterTab,
                isActive && { backgroundColor: colors.primary },
              ]}
              onPress={() => setActiveFilter(tab.value)}
              accessibilityRole="button"
              accessibilityState={{ selected: isActive }}
            >
              <Text
                style={[
                  taskScreenStyles.filterTabText,
                  { color: isActive ? colors.white : colors.textSecondary },
                  isActive && taskScreenStyles.filterTabTextActive,
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* ── Add task card ── */}
      <View style={[taskScreenStyles.addCard, { backgroundColor: colors.surface }]}>
        <View style={taskScreenStyles.addInputRow}>
          <TextInput
            style={[taskScreenStyles.addInput, { color: colors.textPrimary }]}
            placeholder={STRINGS.TASK.ADD_PLACEHOLDER}
            placeholderTextColor={colors.textSecondary}
            value={newTaskTitle}
            onChangeText={setNewTaskTitle}
            returnKeyType="done"
            onSubmitEditing={handleAddTask}
            accessibilityLabel={STRINGS.TASK.A11Y_NEW_TASK}
          />
          <TouchableOpacity
            style={[taskScreenStyles.iconButton, { backgroundColor: colors.background }]}
            onPress={takePhoto}
            accessibilityRole="button"
            accessibilityLabel={STRINGS.TASK.A11Y_TAKE_PHOTO}
          >
            <Text style={taskScreenStyles.iconButtonEmoji}>{STRINGS.TASK.ICON_CAMERA}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[taskScreenStyles.iconButton, { backgroundColor: colors.background }]}
            onPress={pickFromGallery}
            accessibilityRole="button"
            accessibilityLabel={STRINGS.TASK.A11Y_GALLERY}
          >
            <Text style={taskScreenStyles.iconButtonEmoji}>{STRINGS.TASK.ICON_GALLERY}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[taskScreenStyles.iconButton, { backgroundColor: colors.background }]}
            onPress={toggleDatePicker}
            accessibilityRole="button"
            accessibilityLabel={STRINGS.TASK.A11Y_DATE_PICKER}
          >
            <Text style={taskScreenStyles.iconButtonEmoji}>{STRINGS.TASK.ICON_DATE}</Text>
          </TouchableOpacity>
        </View>

        {selectedDate ? (
          <View style={taskScreenStyles.dateChipRow}>
            <View style={[taskScreenStyles.dateChip, { backgroundColor: colors.primary + '22' }]}>
              <Text style={[taskScreenStyles.dateChipText, { color: colors.primary }]}>
                {formatDueDate(selectedDate.getTime())}
              </Text>
              <TouchableOpacity
                onPress={clearDate}
                accessibilityLabel={STRINGS.TASK.A11Y_REMOVE_DATE}
              >
                <Text style={[taskScreenStyles.dateChipRemove, { color: colors.primary }]}>
                  {STRINGS.TASK.ICON_REMOVE}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}

        {showDatePicker ? (
          <DateTimePicker
            value={selectedDate ?? new Date()}
            mode="date"
            display={Platform.OS === 'ios' ? 'inline' : 'default'}
            minimumDate={todayStart()}
            onChange={handleDateChange}
          />
        ) : null}

        {pendingImageUri ? (
          <View style={taskScreenStyles.imagePreviewRow}>
            <Image
              source={{ uri: pendingImageUri }}
              style={taskScreenStyles.imagePreview}
              resizeMode="cover"
            />
            <TouchableOpacity
              style={[
                taskScreenStyles.removeImageButton,
                { backgroundColor: colors.error },
              ]}
              onPress={removePendingImage}
              accessibilityLabel={STRINGS.TASK.A11Y_REMOVE_IMAGE}
            >
              <Text style={[taskScreenStyles.removeImageText, { color: colors.white }]}>
                {STRINGS.TASK.ICON_REMOVE}
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}

        <TouchableOpacity
          style={[
            taskScreenStyles.addButton,
            {
              backgroundColor: newTaskTitle.trim()
                ? colors.primary
                : colors.border,
            },
          ]}
          onPress={handleAddTask}
          disabled={!newTaskTitle.trim()}
          accessibilityRole="button"
          accessibilityLabel={STRINGS.TASK.A11Y_ADD_TASK}
        >
          <Text
            style={[
              taskScreenStyles.addButtonText,
              { color: newTaskTitle.trim() ? colors.white : colors.textSecondary },
            ]}
          >
            {STRINGS.TASK.ADD_BUTTON}
          </Text>
        </TouchableOpacity>
      </View>

      {/* ── Task list ── */}
      <FlatList
        data={filteredTasks}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={taskScreenStyles.listContent}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews
        keyboardShouldPersistTaps="handled"
      />
    </SafeAreaView>
  );
});

TaskScreenView.displayName = 'TaskScreenView';

export default TaskScreenView;
