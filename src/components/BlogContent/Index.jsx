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
    <div className='w-full h-screen'>

      <div className="w-full mx-auto">

        <div className="overflow-x-auto shadow-sm rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <tr>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Article Name</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Type</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Description</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {articles.map((article, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-gray-900">
                    {article.articleTitle}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-600">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {article.categoryName}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600 max-w-xs truncate">
                    {article.articleContent.substring(0, 50)}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">
                    {article.createTime}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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
  );
};

export default BlogContent;