	package youCanDoIt;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;



public class BoardDAO extends DAO {
	
	
	
	public List<Board> getBoardList() {
		List<Board> list = new ArrayList<>();
		Board board;
		String sql = "select bno,title,content,writer,creation_date,(select max(bno)+1 from tbl_board) from tbl_board";
		conn();
		try {
			pstmt = conn.prepareStatement(sql);
			rs=pstmt.executeQuery();
			while(rs.next()) {
			board=new Board();
			board.setBno(rs.getInt("bno"));
			board.setTitle(rs.getString("title"));
			board.setContent(rs.getString("content"));
			board.setWriter(rs.getString("writer"));
			board.setCreationDate(rs.getDate("creation_date"));
		
			list.add(board);
				
			}
				
			
			
		} catch (SQLException e) {
			e.printStackTrace();
		}finally {
			disconnect();
		}
		return list;
	}
	///자동 게시글 추가 ;
	public int getBno() {
		int bno =0;
		String sql = "select Max(bno) from tbl_board";
		conn();
		try {
			pstmt = conn.prepareStatement(sql);
			rs=pstmt.executeQuery();
			
			bno=rs.getInt("select Max(bno)")+1;
				
			
			
		} catch (SQLException e) {
			e.printStackTrace();
		}finally {
			disconnect();
		}
		return bno;
	}
	
	
	
	
	public int deleteBoard(int bno) {
		int result = 0;


		try {
			conn();
			String sql = "DELETE FROM tbl_board WHERE bno = ?";
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1, bno);

			result = pstmt.executeUpdate();

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			disconnect();

		}

		return result;
		
	}

	public int insertBoard(Board bor) {
		int result = 0;


		try {
			conn();
			String sql = "insert into tbl_board(bno,title,content,writer) values(?,?,?,?) ";
			pstmt = conn.prepareStatement(sql);
			pstmt.setInt(1, bor.getBno());
			pstmt.setString(2, bor.getTitle());
			pstmt.setString(3, bor.getContent());
			pstmt.setString(4, bor.getWriter());
			result = pstmt.executeUpdate();

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			disconnect();

		}

		return result;
	}
}
