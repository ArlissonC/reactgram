import {
  COMMENT_PHOTO,
  GET_ALL_PHOTOS,
  LIKE_PHOTO,
  PHOTOS_GET,
  PHOTO_DELETE,
  PHOTO_GET,
  PHOTO_POST,
  PHOTO_UPDATE,
  SEARCH_PHOTOS,
} from "./../../services/photo";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface InitialState {
  photos: any;
  photo: any;
  error: any;
  success: boolean;
  loading: boolean;
  message: string | null;
}

const initialState = {
  photos: [],
  photo: {},
  error: null,
  success: false,
  loading: false,
  message: null,
} as InitialState;

export const publishPhoto = createAsyncThunk(
  "photo/publishPhoto",
  async (photo: any, { rejectWithValue }) => {
    try {
      const { data } = await PHOTO_POST(photo);

      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.errors[0]);
    }
  },
);

export const getPhotos = createAsyncThunk(
  "photo/getPhotos",
  async (id: any) => {
    const { data } = await PHOTOS_GET(id);

    return data;
  },
);

export const deletePhoto = createAsyncThunk(
  "photo/deletePhoto",
  async (id: any, { rejectWithValue }) => {
    try {
      const { data } = await PHOTO_DELETE(id);

      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.errors[0]);
    }
  },
);

export const updatePhoto = createAsyncThunk(
  "photo/updatePhoto",
  async (photoData: any, { rejectWithValue }) => {
    try {
      const { data } = await PHOTO_UPDATE(
        { title: photoData.title },
        photoData.id,
      );

      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.errors[0]);
    }
  },
);

export const getPhoto = createAsyncThunk("photo/getPhoto", async (id: any) => {
  const { data } = await PHOTO_GET(id);

  return data;
});

export const likePhoto = createAsyncThunk(
  "photo/likePhoto",
  async (id: any) => {
    const { data } = await LIKE_PHOTO(id);

    return data;
  },
);

export const commentPhoto = createAsyncThunk(
  "photo/commentPhoto",
  async (commentData: any, { rejectWithValue }) => {
    try {
      const { data } = await COMMENT_PHOTO(
        { comment: commentData.comment },
        commentData.id,
      );

      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.errors[0]);
    }
  },
);

export const getAllPhotos = createAsyncThunk("photo/getAllPhotos", async () => {
  const { data } = await GET_ALL_PHOTOS();

  return data;
});

export const searchPhotos = createAsyncThunk(
  "photo/searchPhotos",
  async (query: string) => {
    const { data } = await SEARCH_PHOTOS(query);

    return data;
  },
);

const slice = createSlice({
  name: "photo",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(publishPhoto.pending, (state) => {
        state.loading = true;
      })
      .addCase(publishPhoto.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.success = true;
        state.photo = payload;
        state.photos.unshift(state.photo);
        state.message = "Foto publicada com sucesso!";
      })
      .addCase(publishPhoto.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.photo = null;
      })
      .addCase(getPhotos.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPhotos.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.success = true;
        state.photos = payload;
      })
      .addCase(deletePhoto.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePhoto.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.success = true;
        state.photos = state.photos.filter((photo: any) => {
          return photo._id !== payload.id;
        });
        state.message = payload.message;
      })
      .addCase(deletePhoto.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.photo = null;
      })
      .addCase(updatePhoto.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePhoto.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.success = true;
        state.photos.map((photo: any) => {
          if (photo._id === payload.photo._id) {
            return (photo.title = payload.photo.title);
          }

          return photo;
        });
        state.message = payload.message;
      })
      .addCase(updatePhoto.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.photo = null;
      })
      .addCase(getPhoto.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPhoto.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.photo = payload;
        state.success = true;
      })
      .addCase(likePhoto.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        console.log(state.photos.likes);

        if (state.photo.likes) {
          state.photo.likes.push(payload.userId);
        }
        state.photos.map((photo: any) => {
          if (photo._id === payload.photoId) {
            return photo.likes.push(payload.userId);
          }

          return photo;
        });

        state.success = true;
      })
      .addCase(commentPhoto.pending, (state) => {
        state.loading = true;
      })
      .addCase(commentPhoto.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.success = true;
        state.photo.comments.push(payload.comment);
        state.message = payload.message;
      })
      .addCase(commentPhoto.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.photo = null;
      })
      .addCase(getAllPhotos.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllPhotos.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.success = true;
        state.photos = payload;
      })
      .addCase(searchPhotos.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchPhotos.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.success = true;
        state.photos = payload;
      });
  },
});

export const { resetMessage } = slice.actions;

export default slice.reducer;
