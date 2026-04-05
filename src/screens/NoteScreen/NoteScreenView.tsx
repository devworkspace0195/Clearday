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
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
import { useNoteScreenViewModel } from './NoteScreenViewModel';
import { noteScreenStyles } from './NoteScreenStyles';
import { STRINGS } from '../../constants';
import type { Note } from './NoteScreenModel';

// ─── Note card ────────────────────────────────────────────────────────────────
interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
  cardBackground: string;
  titleColor: string;
  bodyColor: string;
  dateColor: string;
  deleteBackground: string;
  deleteIconColor: string;
}

const NoteCard: React.FC<NoteCardProps> = memo(
  ({
    note,
    onEdit,
    onDelete,
    cardBackground,
    titleColor,
    bodyColor,
    dateColor,
    deleteBackground,
    deleteIconColor,
  }) => {
    const handleEdit = useCallback(() => onEdit(note), [onEdit, note]);
    const handleDelete = useCallback(() => onDelete(note.id), [onDelete, note.id]);

    const dateLabel = new Date(note.updatedAt).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
    });

    return (
      <TouchableOpacity
        style={[noteScreenStyles.noteCard, { backgroundColor: cardBackground }]}
        onPress={handleEdit}
        activeOpacity={0.75}
        accessibilityRole="button"
        accessibilityLabel={STRINGS.NOTE.a11yEditNote(note.title || STRINGS.NOTE.ADD_TITLE_PLACEHOLDER)}
      >
        <View style={noteScreenStyles.noteCardContent}>
          {note.title.length > 0 ? (
            <Text
              style={[noteScreenStyles.noteCardTitle, { color: titleColor }]}
              numberOfLines={1}
            >
              {note.title}
            </Text>
          ) : null}
          {note.body.length > 0 ? (
            <Text
              style={[noteScreenStyles.noteCardBody, { color: bodyColor }]}
              numberOfLines={2}
            >
              {note.body}
            </Text>
          ) : null}
          <Text style={[noteScreenStyles.noteCardDate, { color: dateColor }]}>
            {dateLabel}
          </Text>
        </View>

        <TouchableOpacity
          style={[noteScreenStyles.noteDeleteButton, { backgroundColor: deleteBackground }]}
          onPress={handleDelete}
          accessibilityRole="button"
          accessibilityLabel={STRINGS.NOTE.a11yDeleteNote(note.title)}
        >
          <Text style={[noteScreenStyles.noteDeleteIcon, { color: deleteIconColor }]}>
            {STRINGS.NOTE.ICON_REMOVE}
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  },
);

NoteCard.displayName = 'NoteCard';

// ─── Empty state ──────────────────────────────────────────────────────────────
interface EmptyStateProps {
  searchQuery: string;
  textColor: string;
  subtleColor: string;
}

const EmptyState: React.FC<EmptyStateProps> = memo(({ searchQuery, textColor, subtleColor }) => {
  const emoji = searchQuery ? STRINGS.NOTE.EMPTY_SEARCH_EMOJI : STRINGS.NOTE.EMPTY_EMOJI;
  const title = searchQuery ? STRINGS.NOTE.EMPTY_SEARCH_TITLE : STRINGS.NOTE.EMPTY_TITLE;
  const subtitle = searchQuery
    ? STRINGS.NOTE.emptySearchSubtitle(searchQuery)
    : STRINGS.NOTE.EMPTY_SUBTITLE;

  return (
    <View style={noteScreenStyles.emptyContainer}>
      <Text style={noteScreenStyles.emptyEmoji}>{emoji}</Text>
      <Text style={[noteScreenStyles.emptyTitle, { color: textColor }]}>{title}</Text>
      <Text style={[noteScreenStyles.emptySubtitle, { color: subtleColor }]}>{subtitle}</Text>
    </View>
  );
});

EmptyState.displayName = 'EmptyState';

// ─── Compose sheet ────────────────────────────────────────────────────────────
interface ComposeSheetProps {
  isEditing: boolean;
  titleDraft: string;
  bodyDraft: string;
  canSave: boolean;
  onChangeTitle: (text: string) => void;
  onChangeBody: (text: string) => void;
  onSave: () => void;
  onCancel: () => void;
  cardBackground: string;
  handleColor: string;
  headingColor: string;
  inputBackground: string;
  inputColor: string;
  placeholderColor: string;
  borderColor: string;
  primaryColor: string;
}

const ComposeSheet: React.FC<ComposeSheetProps> = memo(
  ({
    isEditing,
    titleDraft,
    bodyDraft,
    canSave,
    onChangeTitle,
    onChangeBody,
    onSave,
    onCancel,
    cardBackground,
    handleColor,
    headingColor,
    inputBackground,
    inputColor,
    placeholderColor,
    borderColor,
    primaryColor,
  }) => (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={[noteScreenStyles.composeCard, { backgroundColor: cardBackground }]}>
        <View style={[noteScreenStyles.composeHandle, { backgroundColor: handleColor }]} />
        <Text style={[noteScreenStyles.composeHeading, { color: headingColor }]}>
          {isEditing ? STRINGS.NOTE.EDIT_BUTTON : STRINGS.NOTE.ADD_BUTTON}
        </Text>

        <TextInput
          style={[noteScreenStyles.composeTitleInput, { backgroundColor: inputBackground, color: inputColor }]}
          placeholder={STRINGS.NOTE.ADD_TITLE_PLACEHOLDER}
          placeholderTextColor={placeholderColor}
          value={titleDraft}
          onChangeText={onChangeTitle}
          returnKeyType="next"
          accessibilityLabel={STRINGS.NOTE.ADD_TITLE_PLACEHOLDER}
        />
        <TextInput
          style={[noteScreenStyles.composeBodyInput, { backgroundColor: inputBackground, color: inputColor }]}
          placeholder={STRINGS.NOTE.ADD_BODY_PLACEHOLDER}
          placeholderTextColor={placeholderColor}
          value={bodyDraft}
          onChangeText={onChangeBody}
          multiline
          accessibilityLabel={STRINGS.NOTE.ADD_BODY_PLACEHOLDER}
        />

        <View style={noteScreenStyles.composeActions}>
          <TouchableOpacity
            style={[noteScreenStyles.composeCancelButton, { borderColor }]}
            onPress={onCancel}
            accessibilityRole="button"
          >
            <Text style={[noteScreenStyles.composeCancelText, { color: headingColor }]}>
              {STRINGS.NOTE.CANCEL_BUTTON}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              noteScreenStyles.composeSaveButton,
              { backgroundColor: canSave ? primaryColor : borderColor },
            ]}
            onPress={onSave}
            disabled={!canSave}
            accessibilityRole="button"
            accessibilityLabel={STRINGS.NOTE.A11Y_ADD_NOTE}
          >
            <Text style={noteScreenStyles.composeSaveText}>
              {isEditing ? STRINGS.NOTE.EDIT_BUTTON : STRINGS.NOTE.ADD_BUTTON}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  ),
);

ComposeSheet.displayName = 'ComposeSheet';

// ─── Main screen ──────────────────────────────────────────────────────────────
const NoteScreenView: React.FC = memo(() => {
  const { colors } = useTheme();
  const {
    filteredNotes,
    searchQuery,
    noteCount,
    compose,
    canSave,
    setSearchQuery,
    openCompose,
    openEdit,
    closeCompose,
    setTitleDraft,
    setBodyDraft,
    saveNote,
    removeNote,
    goBack,
  } = useNoteScreenViewModel();

  const handleGoBack = useCallback(() => goBack(), [goBack]);
  const handleClearSearch = useCallback(() => setSearchQuery(''), [setSearchQuery]);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Note>) => (
      <NoteCard
        note={item}
        onEdit={openEdit}
        onDelete={removeNote}
        cardBackground={colors.surface}
        titleColor={colors.textPrimary}
        bodyColor={colors.textSecondary}
        dateColor={colors.textSecondary}
        deleteBackground={colors.background}
        deleteIconColor={colors.textSecondary}
      />
    ),
    [openEdit, removeNote, colors],
  );

  const keyExtractor = useCallback((item: Note) => item.id, []);

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
    <SafeAreaView style={[noteScreenStyles.safeArea, { backgroundColor: colors.background }]}>
      {/* ── Header ── */}
      <View style={noteScreenStyles.header}>
        <TouchableOpacity
          style={[noteScreenStyles.backButton, { backgroundColor: colors.surface }]}
          onPress={handleGoBack}
          accessibilityRole="button"
          accessibilityLabel={STRINGS.NOTE.A11Y_GO_BACK}
        >
          <Text style={[noteScreenStyles.backIcon, { color: colors.textPrimary }]}>
            {STRINGS.NOTE.BACK_ICON}
          </Text>
        </TouchableOpacity>

        <View style={noteScreenStyles.headerTextGroup}>
          <Text style={[noteScreenStyles.title, { color: colors.textPrimary }]}>
            {STRINGS.NOTE.TITLE}
          </Text>
          <Text style={[noteScreenStyles.subtitle, { color: colors.textSecondary }]}>
            {STRINGS.NOTE.subtitle(noteCount)}
          </Text>
        </View>

        <TouchableOpacity
          style={[noteScreenStyles.addButton, { backgroundColor: colors.primary }]}
          onPress={openCompose}
          accessibilityRole="button"
          accessibilityLabel={STRINGS.NOTE.A11Y_OPEN_COMPOSE}
        >
          <Text style={[noteScreenStyles.addButtonIcon, { color: colors.white }]}>
            {STRINGS.NOTE.ICON_ADD}
          </Text>
        </TouchableOpacity>
      </View>

      {/* ── Search ── */}
      <View style={[noteScreenStyles.searchRow, { backgroundColor: colors.surface }]}>
        <Text style={noteScreenStyles.searchIcon}>{STRINGS.NOTE.ICON_SEARCH}</Text>
        <TextInput
          style={[noteScreenStyles.searchInput, { color: colors.textPrimary }]}
          placeholder={STRINGS.NOTE.SEARCH_PLACEHOLDER}
          placeholderTextColor={colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
          returnKeyType="search"
          accessibilityLabel={STRINGS.NOTE.A11Y_SEARCH}
        />
        {searchQuery.length > 0 ? (
          <TouchableOpacity
            onPress={handleClearSearch}
            accessibilityLabel={STRINGS.NOTE.A11Y_SEARCH_CLEAR}
          >
            <Text style={[noteScreenStyles.searchClear, { color: colors.textSecondary }]}>
              {STRINGS.NOTE.ICON_REMOVE}
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>

      {/* ── Note list ── */}
      <FlatList
        data={filteredNotes}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={noteScreenStyles.listContent}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews
        keyboardShouldPersistTaps="handled"
      />

      {/* ── Compose sheet overlay ── */}
      {compose.isOpen ? (
        <View style={noteScreenStyles.overlay}>
          <TouchableWithoutFeedback onPress={closeCompose}>
            <View style={noteScreenStyles.overlayBackdrop} />
          </TouchableWithoutFeedback>
          <ComposeSheet
            isEditing={compose.editingNote !== null}
            titleDraft={compose.titleDraft}
            bodyDraft={compose.bodyDraft}
            canSave={canSave}
            onChangeTitle={setTitleDraft}
            onChangeBody={setBodyDraft}
            onSave={saveNote}
            onCancel={closeCompose}
            cardBackground={colors.surface}
            handleColor={colors.border}
            headingColor={colors.textPrimary}
            inputBackground={colors.background}
            inputColor={colors.textPrimary}
            placeholderColor={colors.textSecondary}
            borderColor={colors.border}
            primaryColor={colors.primary}
          />
        </View>
      ) : null}
    </SafeAreaView>
  );
});

NoteScreenView.displayName = 'NoteScreenView';

export default NoteScreenView;
