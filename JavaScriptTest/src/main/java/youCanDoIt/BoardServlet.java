package youCanDoIt;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

@WebServlet("/board")
public class BoardServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public BoardServlet() {
		super();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		response.setCharacterEncoding("utf-8");
		response.setContentType("text/json; charset = utf-8");

		List<Board> list = new ArrayList<>();

		BoardDAO dao = new BoardDAO();
		list = dao.getBoardList();
		System.out.println(list);
		
		Gson gson = new GsonBuilder().create();
		String json = gson.toJson(list);
		response.getWriter().print(json);
		// 조회의 기능 구현.

	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/json;charset=utf-8");
		
		
		BoardDAO dao = new BoardDAO();
			
//		 delete_no=dark   &job=delete   &date=date
		
		String job = request.getParameter("job");
		System.out.println("job내"+job);
//		 bno ,
//		 title ,
//		 content,
//		 writer ,
//		 creation_date,
		if (job.equals("insert")) {

			String bno = request.getParameter("bno");
			String title = request.getParameter("title");
			String content = request.getParameter("content");
			String writer = request.getParameter("writer");

//			System.out.println(bno + title + content + writer);

			Board bor = new Board();
			bor.setBno(Integer.parseInt(bno));
			bor.setTitle(title);
			bor.setContent(content);
			bor.setWriter(writer);
			
			int result = dao.insertBoard(bor);

			if (result == 1) {

				response.getWriter().print("succ");
			} else {

				response.getWriter().print("fail");
			}

			// 추가, 삭제의 기능을 구현.
		} else if (job.equals("delete")) {
			
			String bno = request.getParameter("delete_no");
			System.out.println(bno);
			int result = dao.deleteBoard(Integer.parseInt(bno));
			if (result == 1) {

				response.getWriter().print("succ");
			} else {

				response.getWriter().print("fail");
			}
		}else if (job.equals("nextBno")) {
			int result = dao.getBno();
			
			System.out.println("nextBro");
			response.getWriter().print(result);
		
			
		}
	}

}
