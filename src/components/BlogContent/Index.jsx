import { useState, useEffect } from 'react';
import axios from 'axios';
import { Pagination, List, Spin, message } from "antd";
import { markdownToHtml } from '../../utils/markdownUtils'; // 确保你有这个工具函数

const BlogContent = () => {

  // 状态管理
  const [articles, setArticles] = useState([]);
  // 分页状态
  const [pagination, setPagination] = useState({
    current: 1,
    size: 5,
    total: 0
  });
  
  // API 调用函数
  const getArticles = (params) => {
    return axios.get('https://www.diveintodream.cn/api/articles/all', { params });
  };

  // 获取文章数据
  const fetchArticles = async () => {
    try {
      const response = await getArticles({
        current: pagination.current,
        size: pagination.size
      });

      if (response.data.flag) {
        const processedArticles = response.data.data.records.map(item => ({
          ...item,
          articleContent: markdownToHtml(item.articleContent)
            .replace(/<\/?[^>]*>/g, '')    // 移除HTML标签
            .replace(/[|]*\n/, '')         // 处理换行
            .replace(/&npsp;/gi, '')       // 处理特殊字符
        }));

        setArticles(processedArticles);
        setPagination(prev => ({
          ...prev,
          total: response.data.data.count
        }));
      }
    } catch (error) {
      // 处理错误
      console.error('获取文章失败:', error);
      // 可以在这里添加错误处理逻辑，比如显示错误提示
    }
  };

  // 分页变化处理
  const handlePageChange = (newPage) => {
    setPagination(prev => ({
      ...prev,
      current: newPage
    }));
  };

  // 初始加载和分页变化时重新获取数据
  useEffect(() => {
    fetchArticles();
  }, [pagination.current]);

  return (
    <div>
      <div className="w-full min-h-screen p-8">
        <div className="w-full mx-auto">
          <a href="https://diveintodream.cn/vue-app/" className="text-3xl font-bold mb-8 flex justify-center">My Blog</a>

          {/* Blog table */}
          <div className="overflow-x-auto">
            <table className="w-full rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left">Article Name</th>
                  <th className="py-3 px-4 text-left">Type</th>
                  <th className="py-3 px-4 text-left">Description</th>
                  <th className="py-3 px-4 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((article, index) => (
                  <tr key={index} className="text-2xl">
                    <td className="py-4 px-4 border-b border-gray-200 pl-[2vw]">{article.articleTitle}</td>
                    <td className="py-4 px-4 border-b border-gray-200">{article.categoryName}</td>
                    <td className="py-4 px-4 border-b border-gray-200">{article.articleContent.substring(0, 50)}</td>
                    <td className="py-4 px-4 border-b border-gray-200">{article.createTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 分页控件 */}
          <div className='w-full flex justify-center'>
            <Pagination
              current={pagination.current}
              pageSize={pagination.size}
              total={pagination.total}
              onChange={handlePageChange}
              style={{ marginTop: "30px", textAlign: "center" }}
              showSizeChanger={false} // 隐藏每页条数切换器（可选）
            />
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default BlogContent;