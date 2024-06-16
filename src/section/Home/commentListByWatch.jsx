import React, { useEffect } from "react";
import useWatch from "../../hooks/useWatch";
import { useParams } from "react-router-dom";
import { Rate } from "antd";

function CommentList({refreshComments}) {
  const { id } = useParams();
  const { fetchCommentListByWatch, commentList } = useWatch();

  useEffect(() => {
    if (id) {
      (async () => {
        await fetchCommentListByWatch(id);
      })();
    }
  }, [id, refreshComments]);
  return (
    <div>
      <div className="justify-center">
        <div class="relative flex py-5 items-center">
          <div class="flex-grow border-t border-gray-400"></div>
          <span class="flex-shrink mx-4 text-orange-700 text-lg">Phản hồi</span>
          <div class="flex-grow border-t border-gray-400"></div>
        </div>
      </div>
      <div className="w-[400px]">
        <h1>{commentList.length} đánh giá</h1>
        {commentList.map((item) => (
          <div
            key={item.id}
            className="flex justify-between border-b border-black mb-4 p-4"
          >
            <div className="space-y-4">
              <p className="font-bold">{item.author}</p>
              <Rate value={item.rating} disabled count={3} allowHalf />
              <p>{item.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentList;
